import { NextFunction, Request, Response } from "express";
import * as SearchServices from "../services/search";
import { SUCCESS } from "../utils/constants/http-status";
import { addUserSearch, hasAvailableSearches } from "../services/users";

export async function search(request: any, response: Response, next: NextFunction) {
    try {
        const userId = request.userSession.userId;
        const isAllowedToSearch = await hasAvailableSearches(userId);
        if (isAllowedToSearch === false) {
            throw new Error('No more searches');
        }

        const result = await SearchServices.search(request.body.search);

        await addUserSearch({
            search: request.body.search,
            userId,
            ongoingScreening: false
        })

        response.status(SUCCESS.OK.CODE).send(result);

    } catch (error) {
        return next(error);
    }
}
