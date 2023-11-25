import { Request, Response } from "express";
import { signInWithCredentials, signUpWithCredentials } from "../services/auth/authentication";
import { SERVER } from "../utils/constants/http-status";
import { isObjectOfType } from "../utils/helpers/checks";
import { IErrorResponse } from "../interfaces/base";
import { APP_CLIENT } from "../utils/configuration";

export async function signUp(request: Request, response: Response): Promise<void> {
    try {
        const result = await signUpWithCredentials(request.body);
        if (isObjectOfType(result, {} as Record<keyof IErrorResponse, any>) && result.success === false) {
            response.status(result.code).send(result);

            return;
        }

        response.send({
            ...result,
            options: {
                url: APP_CLIENT.URL + "/homepage"
            }
        });

    } catch (error) {
        response.status(SERVER.ERROR.CODE).send({
            success: false,
            message: SERVER.ERROR.MESSAGE
        })
    }
}

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