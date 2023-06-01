// eslint-disable-next-line no-unused-vars
import { Db, ObjectId } from 'mongodb';

class UserRepository {
    /**
     * User Repository
     * @param {Db} database
     */
    constructor(database) {
        this.Users = database.collection('users');
    }

    /**
     * Get an User by id
     * @param {ObjectId} user_id
     * @returns User
     */
    getUserByIdAsync = async (user_id) => {
        return this.Users.findOne({ _id: user_id });
    };

    /**
     * Create new user with provider data
     * @param {string} provider
     * @param {string} provider_id
     * @returns {ObjectId} user_id
     */
    createUserAsync = async (provider, provider_id) => {
        const { insertedId: id } = await this.Users.insertOne({
            providers: [{ provider, provider_id }]
        });
        return id;
    };

    /**
     * Get user using provider data
     * @param {string} provider
     * @param {string} provider_id
     * @returns User
     */
    getUserByProviderAsync = async (provider, provider_id) => {
        return this.Users.findOne({ providers: { provider, provider_id } });
    };

    /**
     * Add new provider to existing User
     * @param {string} user_id
     * @param {string} provider
     * @param {string} provider_id
     * @returns User
     */
    addUserProviderAsync = async (user_id, provider, provider_id) => {
        return this.Users.findOneAndUpdate(
            { _id: user_id },
            { $push: { providers: { provider, provider_id } } },
            { returnDocument: 'after' }
        );
    };

    /**
     * Add new history record for plate search
     * @param {string} user_id
     * @param {string} plate
     * @returns User
     */
    addUserPlateHistoryAsync = async (user_id, plate) => {
        return this.Users.findOneAndUpdate(
            { _id: user_id },
            {
                $push: {
                    plate_history: { plate, date: new Date() }
                }
            },
            { returnDocument: 'after' }
        );
    };
}

export default UserRepository;
