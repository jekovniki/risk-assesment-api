import { Request, Response } from "express";
import { signInWithCredentials, signUpWithCredentials } from "../services/auth/authentication";
import { ERRORS, SERVER, SUCCESS } from "../utils/constants/http-status";
import { isObjectOfType } from "../utils/helpers/checks";
import { IErrorResponse } from "../interfaces/base";
import { ACCESS_TOKEN, APP_CLIENT } from "../utils/configuration";
import { getTimeUntilTheEndOfTheDay } from "../utils/helpers/time";
import IdentityToken from "../services/auth/token";
import { getUserSession } from "../services/auth/authorization";

export async function signUp(request: Request, response: Response): Promise<void> {
    try {
        const result = await signUpWithCredentials(request.body);
        if (isObjectOfType(result, {} as Record<keyof IErrorResponse, any>) && result.success === false) {
            response.status(result.code).send(result);

            return;
        }

        response.status(SUCCESS.OK.CODE).send({
            ...result,
            options: {
                url: "https://" + APP_CLIENT.URL + "dashboard"
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
        if (isObjectOfType(result, {} as Record<keyof IErrorResponse, any>) && result.success === false) {
            response.status(ERRORS.BAD_REQUEST.CODE).send(result);

            return;
        }
        const expirationTime = getTimeUntilTheEndOfTheDay();
        if ('data' in result) {
            const sessionData = await getUserSession({
                userId: result.data._id,
                role: result.data.role
            })
            if ('success' in sessionData) {
                response.status(SERVER.ERROR.CODE).send(sessionData);
                return;
            }
            const token = IdentityToken.generate();
            if (typeof token !== 'string') {
                response.status(SERVER.ERROR.CODE).send(token);
                return;
            }
            response.cookie('access_token', sessionData.token, {
                sameSite: 'strict',
                maxAge: ACCESS_TOKEN.LIFE_IN_MILLISECONDS,
                expires: expirationTime,
                httpOnly: true,
                secure: true
            });
        }
        response.status(SUCCESS.OK.CODE).send({
            success: true,
            message: "Successfully signed in. Wait untill you get redirected.",
            options: {
                url: "http://" + APP_CLIENT.URL + "dashboard"
            }
        });

    } catch (error) {
        response.status(SERVER.ERROR.CODE).send({
            success: false,
            message: SERVER.ERROR.MESSAGE
        })
    }
}