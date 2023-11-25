import { IErrorResponse } from "../interfaces/base";
import { ERRORS, SERVER } from "./constants/http-status";
import { logger } from "./logger";

export function handleErrors(error: unknown, code?: number): IErrorResponse {
    logger.error(error);
    if (error instanceof Error) {
        return {
            success: false,
            code: code ?? SERVER.ERROR.CODE,
            message: error.message
        }
    }
    if (error instanceof SyntaxError) {
        return {
            success: false,
            code: code ?? SERVER.ERROR.CODE,
            message: error.message
        }
    }
    if (error instanceof TypeError) {
        return {
            success: false,
            code: code ?? ERRORS.BAD_REQUEST.CODE,
            message: error.message
        }
    }
    if (typeof error === 'string') {
        return {
            success: false,
            code: code ?? SERVER.ERROR.CODE,
            message: error
        }
    }

    return {
        success: false,
        code: code ?? SERVER.ERROR.CODE,
        message: JSON.stringify(error)
    }
}
