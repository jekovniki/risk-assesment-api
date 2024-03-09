import { NextFunction, Request, Response } from "express";
import * as Service from "../services/auth/authentication";
import { SUCCESS } from "../utils/constants/http-status";
import { ACCESS_TOKEN } from "../utils/configuration";
import { getTimeUntilTheEndOfTheDay } from "../helpers/time";
import IdentityToken from "../services/auth/token";
import { googleClient } from "../services/auth/general";
import { InvalidInputError } from "../utils/errors/index";

export async function signUp(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
        const result = await Service.signUpWithCredentials(request.body);

        response.status(SUCCESS.CREATED.CODE).send(result);

    } catch (error) {
        return next(error);
    }
}

export async function signIn(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
        const result = await Service.signInWithCredentials(request.body);
        const token = IdentityToken.generate({ sub: result.id });
        
        response.cookie('access_token', token, {
            sameSite: 'strict',
            maxAge: ACCESS_TOKEN.LIFE_IN_MILLISECONDS,
            expires: getTimeUntilTheEndOfTheDay(),
            httpOnly: true,
            secure: true
        });
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
            throw new InvalidInputError("Google did not authenticate the user");
        }

        const result = await Service.signInWithGoogle(userInfo.data as any);
        const token = IdentityToken.generate({ sub: result.id });

        response.cookie('access_token', token, {
            sameSite: 'strict',
            maxAge: ACCESS_TOKEN.LIFE_IN_MILLISECONDS,
            expires: getTimeUntilTheEndOfTheDay(),
            httpOnly: true,
            secure: true
        });

        response.status(SUCCESS.OK.CODE).send({
            message: "Successfully signed in. Wait untill you get redirected."
        });

    } catch (error) {
        return next(error);
    }
}