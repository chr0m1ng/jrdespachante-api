import { NO_CONTENT } from 'http-status-codes';

class NoContentError extends Error {
    constructor(message) {
        super(message);
        this.status = NO_CONTENT;
    }
}

export default NoContentError;
