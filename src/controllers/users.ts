import { NextFunction, Request, Response } from "express";
import { getUserInformation, getUserSearchHistory } from "../services/users";
import { SUCCESS } from "../utils/constants/http-status";

export async function getUser(request: any, response: Response, next: NextFunction): Promise<void> {
    try {
        const result = await getUserInformation(request.userSession.userId);

        response.status(SUCCESS.OK.CODE).send(result);
    } catch (error) {
        return next(error);
    }
}

export async function getLatestSearches(request: any, response: Response, next: NextFunction): Promise<void> {
    try {
        const result = await getUserSearchHistory(request.userSession.userId);

        response.status(SUCCESS.OK.CODE).send(result);

    } catch (error) {
        return next(error);
    }
}