import { BadRequestError } from '../models/errors/index.js';
import getRoutesAsync from '../routes/routes.js';
import config from '../app-settings.js';

const ROUTES = await getRoutesAsync();

const getRoute = (path, method) => {
    return ROUTES.find(
        (r) =>
            `${config.api.base_path}${r.path}` === path &&
            r.method === method.toLowerCase()
    );
};

const getValidator = (path, method) => {
    const route = getRoute(path, method);
    if (route) {
        return route.validator ? route.validator : null;
    }
    return null;
};

const validateReqParams = (req, _, next) => {
    const validator = getValidator(req.path, req.method);
    if (validator !== null) {
        Object.entries(validator).forEach(([location, schema]) => {
            try {
                schema.validateSync(req[location]);
            } catch (error) {
                return next(new BadRequestError(error.message));
            }
        });
    }
    return next();
};

export default validateReqParams;
