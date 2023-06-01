// eslint-disable-next-line no-unused-vars
import { ObjectSchema } from 'yup';
import { BadRequestError } from '../models/errors/index.js';
import config from '../app-settings.js';
// eslint-disable-next-line no-unused-vars
import Route from '../models/route.js';

/**
 * Get Route from path and method
 * @param {string} path
 * @param {string} method
 * @returns {Route} route
 */
const getRoute = (path, method) => {
    const routes = global.APP.api_routes;
    return routes.find(
        (r) =>
            `${config.api.base_path}${r.path}` === path &&
            r.method === method.toLowerCase()
    );
};

/**
 * Get all validators of a route from path and method
 * @param {string} path
 * @param {string} method
 * @returns {Array<ObjectSchema>} validators
 */
const getValidators = (path, method) => {
    const route = getRoute(path, method);
    if (!route) {
        return [];
    }
    return [route.controller_instance.validator, route.validator].filter(
        (v) => v
    );
};

const validateReqParams = (req, _, next) => {
    const validators = getValidators(req.path, req.method);
    if (validators.length === 0) {
        return next();
    }

    let is_valid = true;

    validators.forEach((validator) => {
        Object.entries(validator).forEach(([location, schema]) => {
            try {
                schema.validateSync(req[location]);
            } catch (error) {
                is_valid = false;
                return next(new BadRequestError(error.message));
            }
        });
    });

    if (is_valid) {
        return next();
    }
};

export default validateReqParams;
