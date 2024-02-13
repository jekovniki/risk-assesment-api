import { NextFunction, Request, Response } from "express";
import { signInWithCredentials, signUpWithCredentials } from "../services/auth/authentication";
import { ERRORS, SERVER, SUCCESS } from "../utils/constants/http-status";
import { isObjectOfType } from "../utils/helpers/checks";
import { IErrorResponse } from "../dtos/base";
import { ACCESS_TOKEN, APP_CLIENT } from "../utils/configuration";
import { getTimeUntilTheEndOfTheDay } from "../utils/helpers/time";
import IdentityToken from "../services/auth/token";
import { getUserSession } from "../services/auth/authorization";

export async function signUp(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
        const result = await signUpWithCredentials(request.body);
        if (isObjectOfType(result, {} as Record<keyof IErrorResponse, any>) && result.success === false) {
            response.status(result.code).send(result);

            return;
        }

        response.status(SUCCESS.OK.CODE).send(result);

    } catch (error) {
        return next(error);
    }
}

export async function signIn(request: Request, response: Response, next: NextFunction): Promise<void> {
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
                throw new Error(sessionData.message);
            }
            const token = IdentityToken.generate();
            if (typeof token !== 'string') {
                throw new Error(token.message);
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
            message: "Successfully signed in. Wait untill you get redirected."
        });

    } catch (error) {
        return next(error);
    }
}