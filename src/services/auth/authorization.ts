import { handleErrors } from "../../utils/errors";
import IdentityToken from "./token";
import { ERRORS, SERVER } from "../../utils/constants/http-status";
// import { cache } from "../../libraries/cache";
import { CACHE_SESSION_PREPOSITION } from "../../utils/constants/cache-keys";
import SessionModel from "../../models/session";
import { IUserAuthorizationData } from "../../dtos/auth";
import { IErrorResponse } from "../../dtos/base";
import { ACCESS_LEVEL } from "../../utils/configuration";

export async function getUserSession(data: IUserAuthorizationData): Promise<{token: string, sessionId: string} | IErrorResponse> {
    try {
        const session = await SessionModel.findOne({ userId: data.userId });
        if (session === null) {
            return generateUserSession(data);
        }

        const sessionDate = new Date(session.expiration);
        const isValidSession = sessionDate.getTime() > Date.now();
        if (isValidSession === false) {
            await SessionModel.deleteOne({ id: session.id });
            // await cache.remove([`${CACHE_SESSION_PREPOSITION}-${session.id}`]);

            return generateUserSession(data);
        }

        const accessToken = IdentityToken.generate({ jti: session.id });
        if (typeof accessToken !== "string") {
            throw accessToken;
        }

        return {
            token: accessToken,
            sessionId: session.id
        }
    } catch (error) {
        return handleErrors(error);
    }
}

export async function generateUserSession(data: IUserAuthorizationData): Promise<any> {
    try {
        let currentDate = new Date();
        let expirationDate = new Date();
        expirationDate.setDate(currentDate.getDate() + 7)

        const sessionId = await SessionModel.create({
            userId: data.userId,
            role: data.role,
            expiration: expirationDate
        })
        if (!sessionId) {
            throw new Error('Error with generating user session')
        }
        const accessToken = IdentityToken.generate({ jti: sessionId });
        if (typeof accessToken !== "string") {
            throw accessToken;
        }

        return {
            token: accessToken,
            sessionId: sessionId
        }
    } catch (error) {
        throw error;
    }
}

export async function validateUserSession(tokenData: Record<string, any>, methodLevel: number): Promise<{ active: boolean, newToken: string | null, userId: string }> {
    const sessionData = await getSessionData(tokenData.jti);
    if (sessionData === null) {
        throw ERRORS.UNAUTHORIZED.MESSAGE;
    }
    const role: string = sessionData.role;
    const roleId = ACCESS_LEVEL[role as keyof typeof ACCESS_LEVEL] as number;
    const tokenExp = tokenData.exp.toString() + "000";
    const isTokenExpired = Date.now() > Number(tokenExp);
    const isUserAuthorized = roleId >= methodLevel;
    const sessionDate = new Date(sessionData.expiration);
    const isValidSession = sessionDate.getTime() > Date.now();

    if (isUserAuthorized === false) {
        throw ERRORS.UNAUTHORIZED.MESSAGE;
    }

    if (isValidSession === false) {
        await SessionModel.deleteOne({ id: sessionData.id });
        // await cache.remove([`${CACHE_SESSION_PREPOSITION}-${sessionData.id}`]);

        throw ERRORS.UNAUTHORIZED.MESSAGE
    }

    const token = IdentityToken.generate({ jti: sessionData.id });
    if (typeof token !== 'string') {
        throw SERVER.ERROR.CODE
    }

    return {
        active: true,
        newToken: isTokenExpired ? token : null,
        userId: sessionData.userId
    }
}

export async function getSessionData(sessionId: string): Promise<any> {
    // const sessionFromCache = await cache.get(`${CACHE_SESSION_PREPOSITION}-${sessionId}`);
    // if (sessionFromCache !== null) {
    //     return JSON.parse(sessionFromCache)
    // }
    const sessionData = await SessionModel.findById(sessionId);
    if (sessionData === null) {
        return sessionData;
    }
    // await cache.set(`${CACHE_SESSION_PREPOSITION}-${sessionData.id}`, JSON.stringify(sessionData));

    return sessionData;

}

export async function removeSession(token: string): Promise<any> {
    try {
        const tokenData = IdentityToken.validate(token);

        if ('success' in tokenData && tokenData.success === false) {
            return {
                success: true,
                message: "Invalid token"
            };
        }
        // await cache.remove([`${CACHE_SESSION_PREPOSITION}-${tokenData.jti}`]);
        await SessionModel.deleteOne({ id: tokenData.jti });

        return {
            success: true,
            message: "OK"
        };
    } catch (error) {
        return handleErrors(error);
    }
}