import { NextFunction, Request, Response } from "express";
import { getUserInformation } from "../services/users";
import { SUCCESS } from "../utils/constants/http-status";

export async function getUser(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
        const result = await getUserInformation(request.body.userId);

        response.status(SUCCESS.OK.CODE).send(result);
    } catch (error) {
        return next(error);
    }
}