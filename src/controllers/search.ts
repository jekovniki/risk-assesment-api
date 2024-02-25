import { NextFunction, Request, Response } from "express";
import { findPEP } from "../services/search";
import { SUCCESS } from "../utils/constants/http-status";
import { addUserSearch } from "../services/users";

export async function findPoliticalyExposedPerson(request: Request, response: Response, next: NextFunction) {
    try {
        const userId = request.body.userId;
        const data = await findPEP(request.body);

        const caseId = await addUserSearch({
            userId,
            search: request.body.search,
            ongoingScreening: request.body.ongoingScreening
        })

        response.status(SUCCESS.OK.CODE).send({
            caseId, data
        });

    } catch (error) {
        return next(error);
    }
}
