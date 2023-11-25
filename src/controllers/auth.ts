import { Request, Response } from "express";
import { signInWithCredentials } from "../services/auth/authentication";
import { SERVER, SUCCESS } from "../utils/constants/http-status";
import { isObjectOfType } from "../utils/helpers/checks";
import { IErrorResponse } from "../interfaces/base";

export async function signIn(request: Request, response: Response): Promise<void> {
    try {
        const result = await signInWithCredentials(request.body);

        if (isObjectOfType(result, {} as Record<keyof IErrorResponse, any>)) {
            response.status(result.code).send(result);

            return;
        }

        response.send(result);

    } catch (error) {
        response.status(SERVER.ERROR.CODE).send({
            success: false,
            message: SERVER.ERROR.MESSAGE
        })
    }
}