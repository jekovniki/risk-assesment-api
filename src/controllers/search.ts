import { Request, Response } from "express";
import { SERVER, SUCCESS } from "../utils/constants/http-status";
import { isObjectOfType } from "../utils/helpers/checks";
import { IErrorResponse } from "../interfaces/base";
import { APP_CLIENT } from "../utils/configuration";
import { getAllCACIAFPEPs } from "../services/search/pep";

export async function pepSearch(request: Request, response: Response): Promise<void> {
    try {
        const result = await getAllCACIAFPEPs();
        if (isObjectOfType(result, {} as Record<keyof IErrorResponse, any>) && result.success === false) {
            response.status(result.code).send(result);

            return;
        }

        response.status(SUCCESS.OK.CODE).send({
            ...result,
            url: APP_CLIENT
        });

    } catch (error) {
        response.status(SERVER.ERROR.CODE).send({
            success: false,
            message: SERVER.ERROR.MESSAGE
        })
    }
}
