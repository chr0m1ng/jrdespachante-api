// eslint-disable-next-line no-unused-vars
import { Db } from 'mongodb';
import UserRepository from '../repository/user-repository.js';

class UserFacade {
    /**
     * User Facade
     * @param {Db} database
     */
    constructor(database) {
        this.user_repository = new UserRepository(database);
    }

    /**
     * Get user by provider
     * @param {string} provider
     * @param {string} provider_id
     * @returns User || null
     */
    getUserByProviderAsync = async (provider, provider_id) => {
        return this.user_repository.getUserByProviderAsync(
            provider,
            provider_id
        );
    };

    /**
     * Sign up new user and return the created user or null if fails
     * @param {string} provider
     * @param {string} provider_id
     * @returns User || null
     */
    signUpAsync = async (provider, provider_id) => {
        const user = await this.getUserByProviderAsync(provider, provider_id);
        if (user) {
            return null;
        }
        const user_id = await this.user_repository.createUserAsync(
            provider,
            provider_id
        );
        return this.user_repository.getUserByIdAsync(user_id);
    };

    /**
     * Add a new plate search in the user history
     * @param {string} provider
     * @param {string} provider_id
     * @param {string} plate
     * @returns User
     */
    addUserPlateHistoryAsync = async (provider, provider_id, plate) => {
        const user = await this.getUserByProviderAsync(provider, provider_id);
        if (!user) {
            return null;
        }
        return this.user_repository.addUserPlateHistoryAsync(user._id, plate);
    };
}

export default UserFacade;
