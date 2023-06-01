/* eslint-disable import/no-unresolved */
import swagger_ui from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import express from 'express';

import 'express-async-errors';

import timeout from 'connect-timeout';
import package_info from '../package.json' assert { type: 'json' };
import app_settings from './app-settings.js';
import routerBuilderAsync from './routes/index.js';
import LoggerProvider from './providers/logger-provider.js';
import DatabaseProvider from './providers/database-provider.js';
import resBodyMiddleware from './middlewares/res-body-middleware.js';
import errorMiddleware from './middlewares/error-middleware.js';
import validatorMiddleware from './middlewares/validator-middleware.js';
import authMiddleware from './middlewares/auth-middleware.js';

import {
    requestLogger,
    responseLogger,
    shouldNotLogPath
} from './middlewares/logger-middleware.js';

const ROUTES_PATH = './src/routes/*.js';
const DEFAULT_PORT = 3333;
const PORT = process.env.PORT || DEFAULT_PORT;
const ETAG = 'etag';

class App {
    constructor() {
        this.app = express();
        // this will be populated early in routerBuilderAsync
        this.api_routes = [];
    }

    buildAsync = async () => {
        this.setupLogger();
        await this.setupDatabaseAsync();
        this.setupPreRoutesMiddlewares();
        await this.setupRoutesAsync();
        this.setupPosRoutesMiddlewares();
    };

    start = () => {
        this.app.listen(PORT, () => {
            this.logger.info(`server listening on port: ${PORT}`);
        });
    };

    setupPreRoutesMiddlewares = () => {
        this.app.disable(ETAG);
        this.app.use(timeout('5s'));
        this.app.use(express.json());
        this.app.use(resBodyMiddleware);
        this.app.use(requestLogger.unless(shouldNotLogPath));
        this.app.use(responseLogger.unless(shouldNotLogPath));
        this.app.use(validatorMiddleware);
        this.app.use(authMiddleware);
    };

    setupPosRoutesMiddlewares = () => {
        this.setupSwagger();
        this.app.use(errorMiddleware);
        this.app.set('trust proxy', 1);
    };

    setupSwagger = () => {
        const options = {
            swaggerDefinition: {
                openapi: '3.0.0',
                info: {
                    title: package_info.name,
                    version: package_info.version,
                    description: package_info.description
                },
                servers: [{ url: app_settings.api.base_path }],
                components: {
                    securitySchemes: {
                        apiKeyAuth: {
                            type: 'apiKey',
                            in: 'header',
                            name: 'X-API-KEY'
                        }
                    }
                },
                security: [
                    {
                        apiKeyAuth: []
                    }
                ]
            },
            apis: [ROUTES_PATH]
        };
        const specs = swaggerJsDoc(options);
        this.app.use(
            app_settings.api.swagger_path,
            swagger_ui.serve,
            swagger_ui.setup(specs)
        );
    };

    setupDatabaseAsync = async () => {
        this.database_provider = new DatabaseProvider();
        this.database = await this.database_provider.getDatabaseAsync();
    };

    setupRoutesAsync = async () => {
        const singletons = {
            database: this.database
        };
        this.app.use(
            app_settings.api.base_path,
            await routerBuilderAsync(singletons)
        );
    };

    setupLogger = () => {
        this.logger = new LoggerProvider().getLogger();
    };

    stopAppAsync = async () => {
        this.logger.info('Stoping the server');
        await this.database_provider.closeDatabaseAsync();
    };
}

export default App;
