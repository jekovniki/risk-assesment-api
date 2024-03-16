import { NextFunction, Request, Response } from "express";

export async function search(request: Request, response: Response, next: NextFunction) {
    try {
        const userId = request.userSession.userId;
        // const data = await findPEP(request.body);

        // const caseId = await addUserSearch({
        //     userId,
        //     search: request.body.search,
        //     ongoingScreening: request.body.ongoingScreening
        // })

        // response.status(SUCCESS.OK.CODE).send({
        //     caseId, data
        // });

    } catch (error) {
        return next(error);
    }
}
