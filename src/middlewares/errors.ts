import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";
import { BaseError } from "../utils/errors/index";
import { SERVER } from "../utils/constants/http-status";

export function handleErrorMiddleware(error: Error, request: Request, response: Response, next: NextFunction) {
    logger.error(error);

    if (error instanceof BaseError) {
        return response.status(error.status).send({ success: false, message: error.message });
    }

    return response.status(SERVER.ERROR.CODE).send({ success: false, message: SERVER.ERROR.MESSAGE });
}