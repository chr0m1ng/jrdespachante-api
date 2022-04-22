import { MongoClient, ServerApiVersion } from 'mongodb';
import config from '../appsettings.json';

const MAX_CONNECTION_RETRIES = 10;

let instance = null;

class DatabaseProvider {
    constructor() {
        this.connection_retries = 0;

        if (!instance) {
            instance = this;
        }
        return instance;
    }

    async _setupDatabaseAsync() {
        if (this.connection_retries > MAX_CONNECTION_RETRIES) {
            throw new Error('Database max connection retries');
        }
        const client = new MongoClient(
            config.database.mongo.connection_string,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverApi: ServerApiVersion.v1
            }
        );
        try {
            await client.connect();
            this.database = client.db(config.database.mongo.database);
        } catch (err) {
            console.error(err);
            this.connection_retries += 1;
            await this._setupDatabaseAsync();
        }
    }

    async getDatabaseAsync() {
        if (!this.database) {
            // eslint-disable-next-line no-underscore-dangle
            await this._setupDatabaseAsync();
        }
        return this.database;
    }

    async closeDatabaseAsync() {
        await this.database.close();
    }
}

export default new DatabaseProvider();
