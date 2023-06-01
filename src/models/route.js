// eslint-disable-next-line no-unused-vars
import { ObjectSchema } from 'yup';
import BaseApiController from '../controllers/base-api-controller.js';

class Route {
    /**
     * Route
     * @param {string} path
     * @param {string} method
     * @param {BaseApiController} controller
     * @param {string} controller_method
     * @param {ObjectSchema} validator
     * @param {CallableFunction} middlewares
     */
    constructor(
        path,
        method,
        controller,
        controller_method,
        validator = null,
        middlewares = []
    ) {
        if (!(controller.prototype instanceof BaseApiController)) {
            throw new Error('Controllers must inherit from BasiApiController');
        }
        this.path = path;
        this.method = method.toLowerCase();
        this.controller = controller;
        this.controller_method = controller_method;
        this.validator = validator;
        this.middlewares = middlewares;
    }

    get controller_instance() {
        return this._controller_instance_obj;
    }

    /**
     * @param {BaseApiController} instance
     */
    set controller_instance(instance) {
        if (!(instance instanceof this.controller)) {
            throw new Error('Instance must be the same type as Controller');
        }
        this._controller_instance_obj = instance;
    }
}

export default Route;
