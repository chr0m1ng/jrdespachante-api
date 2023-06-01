// eslint-disable-next-line no-unused-vars
import { ObjectSchema } from 'yup';

class BaseApiController {
    /**
     * Controller middlewares, applied to all routes of controller
     * @returns {Array<CallableFunction>} middlewares
     */
    get middlewares() {
        return [];
    }

    /**
     * Controller validator, applied to all routes of controller
     * @returns {Record<string, ObjectSchema>} validators
     */
    get validator() {
        return null;
    }
}

export default BaseApiController;
