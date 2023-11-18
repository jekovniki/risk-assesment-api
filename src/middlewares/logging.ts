import { NextFunction, Request, Response } from "express";
import { SERVER } from "../utils/constants/http-status";
import { logger } from "../utils/logger";

export const loggingMiddleware = (request: Request, response: Response, next: NextFunction): void => {
    try {
        const logIp = 'IP: ' + request.ip ?? request.socket.remoteAddress;
        const logHTTP = ' | HTTP: ' + request.httpVersion;
        const logMethod = ' | METHOD: ' + request.method;
        const logUrl = ' | URL: ' + request.path;
        let logMessage = logIp + logHTTP + logMethod + logUrl;
        const logQuery = request.query.length ? ' | QUERY: ' + JSON.stringify(request.query) : '';
        const logBody = JSON.stringify(request.body) !== '{}' ? ' | BODY: \n' + prettifyObjectString(request.body) : '';
        logMessage += logQuery;
        logMessage += logBody;

        logger.info(logMessage);
        next();
    } catch (error) {
        response.status(SERVER.ERROR.CODE).send({
            success: false,
            message: SERVER.ERROR.MESSAGE
        })
    }
}

export function prettifyObjectString(objectAsString: string): string {
    const objectStringWithNewlines = JSON.stringify(objectAsString, null, 2);

    return objectStringWithNewlines;
}

export function isExcludedPath(url: string, listOfPaths: string[]): boolean {

    return listOfPaths.some((sensitivePath) => url.includes(sensitivePath));
}
