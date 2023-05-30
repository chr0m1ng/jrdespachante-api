import { StatusCodes } from 'http-status-codes';

class NoContentError extends Error {
    constructor(message) {
        super(message);
        this.status = StatusCodes.NO_CONTENT;
    }
}

export default NoContentError;
