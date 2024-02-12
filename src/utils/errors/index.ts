import { ERRORS, SERVER } from "../constants/http-status";

export abstract class BaseError extends Error {
    constructor(readonly status: number, readonly message: string) {
        super(message);
    }
}

export class InvalidInputError extends BaseError {
    constructor(message: string = ERRORS.BAD_REQUEST.MESSAGE) {
        super(ERRORS.BAD_REQUEST.CODE, message);
    }
}

export class EntityNotFoundError extends BaseError {
    constructor(message: string = ERRORS.NOT_FOUND.MESSAGE) {
        super(ERRORS.NOT_FOUND.CODE, message);
    }
}

export class UnexpectedServerError extends BaseError {
    constructor(message: string = SERVER.ERROR.MESSAGE) {
        super(SERVER.ERROR.CODE, message);
    }
}

export class PaginationParamsError extends BaseError {
    constructor(message: string = ERRORS.BAD_REQUEST.MESSAGE) {
        super(ERRORS.BAD_REQUEST.CODE, message);
    }
}