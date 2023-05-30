import bunyan from 'bunyan';
import bunyan_seq from 'bunyan-seq';
import package_info from '../../package.json' assert { type: 'json' };
import app_settings from '../appsettings.json' assert { type: 'json' };

const { createStream } = bunyan_seq;
const { seq } = app_settings;
let instance = null;

class LoggerProvider {
    constructor() {
        if (!instance) {
            instance = this;
        }
    }

    _setupLogger = () => {
        const streams = [
            {
                stream: process.stdout,
                level: bunyan.TRACE
            }
        ];
        if (seq.server_url && seq.api_key) {
            streams.push(
                createStream({
                    serverUrl: seq.server_url,
                    apiKey: seq.api_key,
                    level: bunyan.TRACE
                })
            );
        }
        const logger = bunyan.createLogger({
            name: package_info.name,
            streams,
            Application: package_info.name
        });

        this.logger = logger;
    };

    getLogger = () => {
        if (!this.logger) {
            this._setupLogger();
        }
        return this.logger;
    };
}

export default LoggerProvider;
