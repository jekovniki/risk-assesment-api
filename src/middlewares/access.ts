import { NextFunction, Request, Response } from 'express';
import { ERRORS } from '../utils/constants/http-status';
import IdentityToken from '../services/auth/token';
import { ACCESS_LEVEL } from '../utils/configuration';
import { validateUserSession } from '../services/auth/authorization';
import { getTimeUntilTheEndOfTheDay } from '../utils/helpers/time';

export const accessControlMiddleware = (METHOD_LEVEL = ACCESS_LEVEL.UNAUTHORIZED) => {

    return async (request: Request, response: Response, next: NextFunction) => {
        try {
            if (METHOD_LEVEL === ACCESS_LEVEL.UNAUTHORIZED) {
                next();
                return;
            }
            const token = getToken(request);
            const tokenData = IdentityToken.validate(token);
            const expirationTime = getTimeUntilTheEndOfTheDay();

            if (tokenData.success === false || tokenData.exp === undefined) {
                throw ERRORS.UNAUTHORIZED.MESSAGE;
            }

            const currentSessionData = await validateUserSession(tokenData, METHOD_LEVEL);

            if (currentSessionData.active === false) {
                throw ERRORS.UNAUTHORIZED.MESSAGE
            }
            if (currentSessionData.active === true && currentSessionData.newToken !== null) {
                response.cookie('access_token', currentSessionData.newToken, {
                    sameSite: 'strict',
                    expires: expirationTime,
                    httpOnly: true,
                    secure: false
                });
            }

            request.body.userId = currentSessionData.userId;
            
            next();
        } catch (error) {
            response.status(ERRORS.UNAUTHORIZED.CODE).send({
                success: false,
                message: error && typeof error === 'object' && 'message' in error ? error.message : ERRORS.UNAUTHORIZED.MESSAGE
            })
        }
    }
    
}

function getToken(request: Request): string {
    const accessToken = request.cookies.access_token;
    if (!accessToken) {
        throw ERRORS.UNAUTHORIZED.MESSAGE;
    }

    return accessToken;
}