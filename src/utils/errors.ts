import { IBaseResponse } from "../interfaces/base";
import { logger } from "./logger";

export function handleErrors(error: unknown): IBaseResponse {
    logger.error(error);
    if (error instanceof Error) {
        return {
            success: false,
            message: error.message
        }
    }
    if (error instanceof SyntaxError) {
        return {
            success: false,
            message: error.message
        }
    }
    if (error instanceof TypeError) {
        return {
            success: false,
            message: error.message
        }
    }
    if (typeof error === 'string') {
        return {
            success: false,
            message: error
        }
    }

    return {
        success: false,
        message: JSON.stringify(error)
    }
}
