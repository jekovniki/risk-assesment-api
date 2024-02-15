import { NextFunction, Request, Response } from "express";
import { findPEP } from "../services/search";
import { SUCCESS } from "../utils/constants/http-status";
import { InvalidInputError } from "../utils/errors/index";

export async function findPoliticalyExposedPerson(request: Request, response: Response, next: NextFunction) {
    try {
        const result = await findPEP(request.body);

        response.status(SUCCESS.OK.CODE).send(result);

    } catch (error) {
        return next(error);
    }
}
