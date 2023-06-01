// eslint-disable-next-line no-unused-vars
import { Db } from 'mongodb';
import { UnauthorizedError } from '../models/errors/index.js';
import UserFacade from '../facades/user-facade.js';
import app_settings from '../app-settings.js';

const { base_path: API_BASE_PATH } = app_settings.api;

/**
 * Authenticate the provider data
 * @param {UserFacade} user_facade
 * @param {Object} req
 * @param {Object} _
 * @param {CallableFunction} next
 */
const authMiddlewareAsync = async (user_facade, req, _, next) => {
    if (!req.baseUrl.startsWith(API_BASE_PATH)) {
        return next();
    }
    const { provider, provider_id } = req.headers;

    // routes that depends on provider auth must request it on it's validators
    if (provider === undefined && provider_id === undefined) {
        return next();
    }

    if (
        provider !== null &&
        provider_id !== null &&
        (await user_facade.getUserByProviderAsync(provider, provider_id))
    ) {
        return next();
    }

    return next(new UnauthorizedError('Invalid credentials given.'));
};

/**
 * Build the Auth Middleware
 * @param {Db} database
 * @returns {CallableFunction} middleware
 */
const buildProviderAuthMiddleware = (database) => {
    return (...params) =>
        authMiddlewareAsync(new UserFacade(database), ...params);
};

export default buildProviderAuthMiddleware;
