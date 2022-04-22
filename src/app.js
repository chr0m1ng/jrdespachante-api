/* eslint-disable import/no-unresolved */
import swagger_ui from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import express from 'express';

import 'express-async-errors';

import timeout from 'connect-timeout';
import package_info from '../package.json';
import config from './appsettings.json';
import router from './routes';
import logger from './providers/logger-provider';
import resBodyMiddleware from './middlewares/res-body-middleware';
import errorMiddleware from './middlewares/error-middleware';
import validatorMiddleware from './middlewares/validator-middleware';

import {
    requestLogger,
    responseLogger,
    shouldNotLogPath
} from './middlewares/logger-middleware';

const ROUTES_PATH = process.env.IS_PRODUCTION
    ? 'C:\\home\\site\\wwwroot\\src\\routes\\*.js'
    : './src/routes/*.js';
const DEFAULT_PORT = 3333;
const PORT = process.env.PORT || DEFAULT_PORT;
const ETAG = 'etag';

class App {
    constructor() {
        this.app = express();
    }

    async build() {
        this.setupLogger();
        this.setupPreRoutesMiddlewares();
        this.setupRoutes();
        this.setupPosRoutesMiddlewares();
    }

    start() {
        this.app.listen(PORT, () => {
            this.logger.info(`server listening on port: ${PORT}`);
        });
    }

    setupPreRoutesMiddlewares() {
        this.app.disable(ETAG);
        this.app.use(timeout('5s'));
        this.app.use(express.json());
        this.app.use(resBodyMiddleware);
        this.app.use(requestLogger.unless(shouldNotLogPath));
        this.app.use(responseLogger.unless(shouldNotLogPath));
        this.app.use(validatorMiddleware);
    }

    setupPosRoutesMiddlewares() {
        this.setupSwagger();
        this.app.use(errorMiddleware);
        this.app.set('trust proxy', 1);
    }

    setupSwagger() {
        const options = {
            swaggerDefinition: {
                info: {
                    title: package_info.name,
                    version: package_info.version,
                    description: package_info.description
                },
                basePath: config.api.base_path
            },
            apis: [ROUTES_PATH]
        };
        const specs = swaggerJsDoc(options);
        this.app.use(
            config.api.swagger_path,
            swagger_ui.serve,
            swagger_ui.setup(specs)
        );
    }

    setupRoutes() {
        this.app.use(config.api.base_path, router);
    }

    setupLogger() {
        this.logger = logger;
    }

    async stopApp() {
        this.logger.info('Stoping the server');
    }
}

export default App;
