/* eslint-disable new-cap */
import { Router } from 'express';
import getRoutesAsync from './routes.js';
import ClassHelpers from '../helpers/class-helpers.js';
import DictHelpers from '../helpers/dict-helpers.js';

/**
 * Build router routes
 * @param {Record<string, Object>} singletons
 */
const routerBuilderAsync = async (singletons = {}) => {
    const router = Router();
    const routes = await getRoutesAsync();
    routes.forEach((route) => {
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

        router[route.method](
            route.path,
            route.middlewares,
            new route.controller(...requested_singletons)[
                route.controller_method
            ]
        );
    });

    return router;
};

export default routerBuilderAsync;
