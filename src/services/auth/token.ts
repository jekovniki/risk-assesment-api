import jsonwebtoken from 'jsonwebtoken';
import { IBaseResponse } from "../../dtos/base";
import { handleErrors } from "../../utils/errors";
import { ACCESS_TOKEN } from '../../utils/configuration';

export default class IdentityToken {
    public static generate(data: Record<string, any> = {}, expiresIn: string = ACCESS_TOKEN.LIFE): string {
        return jsonwebtoken.sign({
            ...data,
            iss: ACCESS_TOKEN.ISSUER,
            iat: Date.now() / 1000
        }, ACCESS_TOKEN.SECRET, {
            algorithm: ACCESS_TOKEN.ALGORITHM as jsonwebtoken.Algorithm,
            expiresIn: expiresIn
        });

    }

    public static validate(token: string): Record<string, any> {
        try {
            const tokenData = jsonwebtoken.verify(token, ACCESS_TOKEN.SECRET, {
                algorithms: [ACCESS_TOKEN.ALGORITHM as jsonwebtoken.Algorithm],
                issuer: ACCESS_TOKEN.ISSUER,
                ignoreExpiration: false
            }) as jsonwebtoken.JwtPayload;

            return {
                success: true,
                ...tokenData
            }
        } catch (error) {
            return handleErrors(error);
        }
    }
}