import { NextFunction, Request, Response } from "express";
import * as SearchOptions from "../services/search-options";
import { SUCCESS } from "../utils/constants/http-status";


export async function getGenders(request: Request, response: Response, next: NextFunction) {
    try {
        const result = await SearchOptions.getGenders();

        response.status(SUCCESS.OK.CODE).send(result);
    } catch (error) {
        return next(error);
    }
}

export async function getEntities(request: Request, response: Response, next: NextFunction) {
    try {
        const result = await SearchOptions.getEntityType();

        response.status(SUCCESS.OK.CODE).send(result);
    } catch (error) {
        return next(error);
    }
}