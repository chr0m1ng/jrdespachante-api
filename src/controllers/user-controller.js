// eslint-disable-next-line no-unused-vars
import { Db } from 'mongodb';
import { StatusCodes } from 'http-status-codes';
import BaseApiController from './base-api-controller.js';
import UserFacade from '../facades/user-facade.js';

class UserController extends BaseApiController {
    /**
     * User Controller
     * @param {Db} database
     */
    constructor(database) {
        super();
        this.user_facade = new UserFacade(database);
    }

    signUpAsync = async (req, res) => {
        const { provider, provider_id } = req.body;

        const user = await this.user_facade.signUpAsync(provider, provider_id);

        return res.status(StatusCodes.CREATED).json(user);
    };

    signInAsync = async (req, res) => {
        const { provider, provider_id } = req.headers;

        const user = await this.user_facade.getUserByProviderAsync(
            provider,
            provider_id
        );

        return res.status(StatusCodes.OK).json(user);
    };
}

export default UserController;
