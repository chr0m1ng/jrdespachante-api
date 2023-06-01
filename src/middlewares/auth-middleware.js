import { UnauthorizedError } from '../models/errors/index.js';
import app_settings from '../app-settings.js';

const { base_path: API_BASE_PATH, auth_key: API_AUTH_KEY } = app_settings.api;

/**
 * Auth middleware to check X-API-KEY
 * @param {Object} req
 * @param {Object} _
 * @param {CallableFunction} next
 */
const authMiddleware = (req, _, next) => {
    if (!req.path.startsWith(API_BASE_PATH)) {
        return next();
    }
    const { 'x-api-key': x_api_key } = req.headers;

    if (!x_api_key || x_api_key !== API_AUTH_KEY) {
        throw new UnauthorizedError('Invalid credentials given.');
    }

    return next();
};

export default authMiddleware;
