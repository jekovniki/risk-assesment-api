import { handleErrors } from "../../utils/errors";
import { decodeCredentials, encryptPassword } from "./general";
import { IUserData } from "../../interfaces/auth";
import { IBaseResponse, IErrorResponse } from "../../interfaces/base";
import { TSignIn, TSignUpInput } from "../../types/auth";
import UserModel, { IUserModel } from "../../models/user"; 
import { logger } from "../../utils/logger";
import { SUCCESSFULL_REGISTRATION } from "../../utils/constants/success";

export async function signInWithCredentials(credentials: TSignIn): Promise<IUserData | IBaseResponse>{
    try {
        
        return {
            success: true,
            data: null
        }
    } catch (error) {
        return handleErrors(error);
    }
}

export async function signInWithGoogle() {

}

export async function signUpWithCredentials(credentials: TSignUpInput): Promise<IBaseResponse | IErrorResponse> {
    try {
        const encryptedPassword = await encryptPassword(credentials.password);

        await UserModel.create({
            email: credentials.email,
            password: encryptedPassword,
            gender: credentials.gender,
            dateOfBirth: new Date(credentials.dateOfBirth),
            firstName: credentials.firstName,
            lastName: credentials.lastName,
        })
        
        logger.info('User successfully register. Email: ' + credentials.email);

        return {
            success: true,
            message: SUCCESSFULL_REGISTRATION
        }
    } catch (error) {
        return handleErrors(error);
    }
}