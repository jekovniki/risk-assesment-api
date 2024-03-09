import { NextFunction, Request, Response } from 'express';
import { ERRORS } from '../utils/constants/http-status';
import IdentityToken from '../services/auth/token';
import { UnauthorizedError } from '../utils/errors/index';

/**
 * For now I only have one role, so just a simple validation is enough
 * 
 * @todo : Take care of the authorization when we get more info on the app
 */

export const accessControlMiddleware = () => {
    return async (request: Request, response: Response, next: NextFunction) => {
        try {
            const token = getToken(request);
            const tokenData = IdentityToken.validate(token);
            const isTokenExpired = new Date().getTime() > (Number(tokenData.exp + '000'));
            const isTokenValid = new Date().getTime() > tokenData.iat;
            if (tokenData.exp === undefined || isTokenExpired || isTokenValid === false) {
                throw new UnauthorizedError();
            }

            request.body = {
                ...request.body,
                sessionData: {
                    userId: tokenData.sub
                }
            };

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