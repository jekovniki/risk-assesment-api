import { handleErrors } from "../../utils/errors";
import { comparePassword, encryptPassword } from "./general";
import { IUserDataResponse } from "../../dtos/user";
import { IBaseResponse, IErrorResponse } from "../../dtos/base";
import { IGoogleData, TSignIn, TSignUpInput } from "../../dtos/auth";
import UserModel, { IUserModel } from "../../models/user"; 
import { logger } from "../../utils/logger";
import { SUCCESSFULL_REGISTRATION } from "../../utils/constants/success";
import { USER_NOT_EXISTS, WRONG_CREDENTIALS } from "../../utils/constants/errors";
import { InvalidInputError } from "../../utils/errors/index";

export async function signInWithCredentials(credentials: TSignIn): Promise<IUserDataResponse | IErrorResponse>{
    try {
        const user = await UserModel.findOne({ email: credentials.email });
        if (user === null) {
            throw new InvalidInputError(USER_NOT_EXISTS);
        }
        const isCorrectPassword = await comparePassword(credentials.password, user.password);
        if (!isCorrectPassword) {
            throw new InvalidInputError(WRONG_CREDENTIALS);
        }
        return {
            success: true,
            data: user
        }
    } catch (error) {
        return handleErrors(error);
    }
}

export async function signInWithGoogle(data: IGoogleData): Promise<IUserModel> {
    if (data.verified_email === false) {
        throw new InvalidInputError("Please verify your email before continuing with google sign in!");
    }
    const isUserRegistered = await UserModel.find({ googleId: data.id });
    if (isUserRegistered) {
        return isUserRegistered[0];
    }

    await UserModel.create({
        googleId: data.id,
        email: data.email,
        firstName: data.given_name,
        lastName: data.family_name
    });

    const result =  await UserModel.find({ googleId: data.id });
    if (!result) {
        throw new Error("User missing after creation");
    }

    return result[0];
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