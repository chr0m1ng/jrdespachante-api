/* eslint-disable new-cap */
import { Router } from 'express';
import getRoutesAsync from './routes.js';
import ClassHelpers from '../helpers/class-helpers.js';
import DictHelpers from '../helpers/dict-helpers.js';
// eslint-disable-next-line no-unused-vars
import BaseApiController from '../controllers/base-api-controller.js';
// eslint-disable-next-line no-unused-vars
import Route from '../models/route.js';

const API_CONTROLLERS_INSTANCES = {};

/**
 * Create a new instance of a given controller
 * @param {Route} route
 * @param {Record<string, Object>} singletons
 * @returns {BaseApiController} controller
 */
const instantiateNewController = (route, singletons) => {
    const controller_params = ClassHelpers.getClassConstructorParameters(
        route.controller
    );
    const requested_singletons = DictHelpers.getDictValuesFromKeys(
        singletons,
        controller_params
    );
    if (requested_singletons.some((rs) => !rs)) {
        throw new Error(
            `Missing one or more singletons for controller ${route.controller.name}`
        );
    }
    const controller_instance = new route.controller(...requested_singletons);

    API_CONTROLLERS_INSTANCES[route.controller] = controller_instance;
    route.controller_instance = controller_instance;
    global.APP.api_routes.push(route);

    return controller_instance;
};

/**
 * Build router routes
 * @param {Record<string, Object>} singletons
 */
const routerBuilderAsync = async (singletons = {}) => {
    const router = Router();
    const routes = await getRoutesAsync();
    routes.forEach((route) => {
        const controller_instance =
            API_CONTROLLERS_INSTANCES[route.controller] ??
            instantiateNewController(route, singletons);

        router[route.method](
            route.path,
            [...controller_instance.middlewares, ...route.middlewares],
            controller_instance[route.controller_method]
        );
    });

    return router;
};

export default routerBuilderAsync;
