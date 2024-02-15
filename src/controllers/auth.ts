import { NextFunction, Request, Response } from "express";
import * as Service from "../services/auth/authentication";
import { ERRORS, SUCCESS } from "../utils/constants/http-status";
import { isObjectOfType } from "../utils/helpers/checks";
import { IErrorResponse } from "../dtos/base";
import { ACCESS_TOKEN } from "../utils/configuration";
import { getTimeUntilTheEndOfTheDay } from "../utils/helpers/time";
import IdentityToken from "../services/auth/token";
import { getUserSession } from "../services/auth/authorization";
import { googleClient } from "../services/auth/general";
import { InvalidInputError } from "../utils/errors/index";

export async function signUp(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
        const result = await Service.signUpWithCredentials(request.body);
        if (isObjectOfType(result, {} as Record<keyof IErrorResponse, any>) && result.success === false) {
            response.status(result.code).send(result);

            return;
        }

        response.status(SUCCESS.CREATED.CODE).send(result);

    } catch (error) {
        return next(error);
    }
}

export async function signIn(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
        const result = await Service.signInWithCredentials(request.body);
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

export async function signInWithGoogle(_request: Request, response: Response, next: NextFunction) {
    try {
        const authorizationUrl = googleClient.generateAuthUrl({
            access_type: 'offline',
            scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"]
        });
        
        response.redirect(authorizationUrl);
    } catch (error) {
        return next(error);
    }
}

export async function signInWithGoogleCallback(request: Request, response: Response, next: NextFunction) {
    try {
        const { code } = request.query;
        if (typeof code !== 'string') {
            throw new InvalidInputError();
        }
        const tokens: any = await googleClient.getToken(code);
        googleClient.setCredentials(tokens.tokens);

        const userInfo = await googleClient.request({
            url: 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json'
        });
        if (!userInfo.data) {
            throw new Error("Google did not authenticate the user");
        }
        const result = await Service.signInWithGoogle(userInfo.data as any);
        const expirationTime = getTimeUntilTheEndOfTheDay();
        if (result) {
            const sessionData = await getUserSession({
                userId: result._id,
                role: result.role
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