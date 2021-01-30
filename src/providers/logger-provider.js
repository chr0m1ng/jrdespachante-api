import bunyan from 'bunyan';
import { createStream } from 'bunyan-seq';
import package_info from '../../package.json';
import { seq } from '../appsettings.json';

let instance = null;

class LoggerProvider {
    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    _setupLogger() {
        const logger = bunyan.createLogger({
            name: package_info.name,
            streams: [
                {
                    stream: process.stdout,
                    level: bunyan.INFO
                },
                createStream({
                    serverUrl: seq.server_url,
                    apiKey: seq.api_key,
                    level: bunyan.INFO
                })
            ],
            Application: package_info.name
        });

        this.logger = logger;
    }

    getLogger() {
        if (!this.logger) {
            // eslint-disable-next-line no-underscore-dangle
            this._setupLogger();
        }
        return this.logger;
    }
}

export default new LoggerProvider().getLogger();
