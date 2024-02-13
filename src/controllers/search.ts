import { NextFunction, Request, Response } from "express";
import { SERVER, SUCCESS } from "../utils/constants/http-status";
import { isObjectOfType } from "../utils/helpers/checks";
import { IErrorResponse } from "../dtos/base";
import { APP_CLIENT } from "../utils/configuration";
import { getAllCACIAFPEPs } from "../services/search/pep";
import { cache } from "../libraries/cache";

export async function pepSearch(_request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
        const caciaf = await cache.get("CACIAF");
        if (caciaf) {
            response.status(SUCCESS.OK.CODE).send(JSON.parse(caciaf));
            return;
        }

        const result = await getAllCACIAFPEPs();
        if (isObjectOfType(result, {} as Record<keyof IErrorResponse, any>) && result.success === false) {
            response.status(result.code).send(result);

            return;
        }

        await cache.set("CACIAF", JSON.stringify({ ...result, url: APP_CLIENT }));

        response.status(SUCCESS.OK.CODE).send(result)

    } catch (error) {
        return next(error);
    }
}
