import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";
import { BaseError } from "../utils/errors/index";
import { SERVER } from "../utils/constants/http-status";

export function handleErrorMiddleware(error: Error, _request: Request, response: Response, next: NextFunction) {
    logger.error(error);

    if (error instanceof BaseError) {
        return response.status(error.status).send({ error: error.message });
    }

    return response.status(SERVER.ERROR.CODE).send({ error: SERVER.ERROR.MESSAGE });
}