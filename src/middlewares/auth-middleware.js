// eslint-disable-next-line no-unused-vars
import { Db } from 'mongodb';
import { UnauthorizedError } from '../models/errors/index.js';
import UserFacade from '../facades/user-facade.js';
import app_settings from '../app-settings.js';

const { base_path: API_BASE_PATH, auth_key: API_AUTH_KEY } = app_settings.api;

/**
 * Authenticate the X-API-KEY
 * @param {string} api_key
 */
const authenticateApiKey = (api_key) => {
    if (!api_key || api_key !== API_AUTH_KEY) {
        throw new UnauthorizedError('Invalid credentials given.');
    }
};

/**
 * Authenticate the provider data
 * @param {UserFacade} user_facade
 * @param {string} provider
 * @param {string} provider_id
 */
const authenticateProviderAsync = async (
    user_facade,
    provider,
    provider_id
) => {
    if (
        !provider ||
        !provider_id ||
        !(await user_facade.getUserByProviderAsync(provider, provider_id))
    ) {
        throw new UnauthorizedError('Invalid credentials given.');
    }
};

/**
 * Auth middleware to check api key and provider data
 * @param {UserFacade} user_facade
 * @param {Object} req
 * @param {Object} _
 * @param {CallableFunction} next
 */
const authMiddlewareAsync = async (user_facade, req, _, next) => {
    if (!req.path.startsWith(API_BASE_PATH)) {
        return next();
    }
    const { provider, provider_id, 'x-api-key': x_api_key } = req.headers;

    authenticateApiKey(x_api_key);

    // routes that depends on provider auth must request it on it's validators
    if (provider !== undefined && provider_id !== undefined) {
        await authenticateProviderAsync(user_facade, provider, provider_id);
    }

    return next();
};

/**
 * Build the Auth Middleware
 * @param {Db} database
 * @returns {CallableFunction} middleware
 */
const buildAuthMiddleware = (database) => {
    return (...params) =>
        authMiddlewareAsync(new UserFacade(database), ...params);
};

export default buildAuthMiddleware;
