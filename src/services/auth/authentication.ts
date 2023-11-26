import { handleErrors } from "../../utils/errors";
import { comparePassword, encryptPassword } from "./general";
import { IUserDataResponse } from "../../interfaces/user";
import { IBaseResponse, IErrorResponse } from "../../interfaces/base";
import { TSignIn, TSignUpInput } from "../../types/auth";
import UserModel from "../../models/user"; 
import { logger } from "../../utils/logger";
import { SUCCESSFULL_REGISTRATION } from "../../utils/constants/success";
import { USER_NOT_EXISTS, WRONG_CREDENTIALS } from "../../utils/constants/errors";
import { ERRORS } from "../../utils/constants/http-status";

export async function signInWithCredentials(credentials: TSignIn): Promise<IUserDataResponse | IErrorResponse>{
    try {
        const user = await UserModel.findOne({ email: credentials.email });
        if (user === null) {
            return {
                success: false,
                code: ERRORS.BAD_REQUEST.CODE,
                message: USER_NOT_EXISTS,
            }
        }
        const isCorrectPassword = await comparePassword(credentials.password, user.password);
        if (!isCorrectPassword) {
            return {
                success: false,
                code: ERRORS.BAD_REQUEST.CODE,
                message: WRONG_CREDENTIALS
            }
        }

        return {
            success: true,
            data: user
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