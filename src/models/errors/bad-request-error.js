import { StatusCodes } from 'http-status-codes';

class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.status = StatusCodes.BAD_REQUEST;
    }
}

export default BadRequestError;
