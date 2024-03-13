import { comparePassword, encryptPassword } from "./general";
import { IBaseResponse } from "../../dtos/base";
import { IGoogleData, TSignIn, TSignUpInput } from "../../dtos/auth";
import { logger } from "../../utils/logger";
import { SUCCESSFULL_REGISTRATION } from "../../utils/constants/success";
import { USER_NOT_EXISTS, WRONG_CREDENTIALS } from "../../utils/constants/errors";
import { IUserModel, UserModel } from "../../models/user";
import { InvalidInputError } from "../../utils/errors/index";

export async function signInWithCredentials(credentials: TSignIn): Promise<IUserModel> {
    const user = await UserModel.findOne('email', credentials.email);
    if (user === null) {
        throw new InvalidInputError(USER_NOT_EXISTS);
    }
    if (!user.password) {
        throw new InvalidInputError("User exists, but he needs to sign in with google")
    }
    const isCorrectPassword = await comparePassword(credentials.password, user.password);
    if (!isCorrectPassword) {
        throw new InvalidInputError(WRONG_CREDENTIALS);
    }
    return user;
}

export async function signInWithGoogle(data: IGoogleData): Promise<IUserModel> {
    if (data.verified_email === false) {
        throw new InvalidInputError("Please verify your email before continuing with google sign in!");
    }
    const isUserRegistered = await UserModel.findOne('googleId', data.id);
    if (isUserRegistered) {
        return isUserRegistered;
    }

    await UserModel.create({
        googleId: data.id,
        email: data.email,
        firstName: data.given_name,
        lastName: data.family_name
    } as any);

    const result = await UserModel.findOne('googleId', data.id);
    if (!result) {
        throw new Error("User missing after creation");
    }

    return result;
}

export async function signUpWithCredentials(credentials: TSignUpInput): Promise<IBaseResponse> {
    const encryptedPassword = await encryptPassword(credentials.password);

    await UserModel.create({
        email: credentials.email,
        password: encryptedPassword,
        gender: credentials.gender,
        dateOfBirth: new Date(credentials.dateOfBirth),
        firstName: credentials.firstName,
        lastName: credentials.lastName,
    } as any)

    logger.info('User successfully register. Email: ' + credentials.email);

    return {
        success: true,
        message: SUCCESSFULL_REGISTRATION
    }
}