import { handleErrors } from "../utils/errors";
import { IUserInformationResponse } from "../interfaces/user";
import { IErrorResponse } from "../interfaces/base";
import { TSignIn } from "../types/auth";
import UserModel from "../models/user";
import { USER_NOT_EXISTS } from "../utils/constants/errors";
import { ERRORS } from "../utils/constants/http-status";

export async function getUserInformation(userId:string): Promise<IUserInformationResponse | IErrorResponse>{
    try {
        const user = await UserModel.findById(userId);
        if (user === null) {
            return {
                success: false,
                code: ERRORS.BAD_REQUEST.CODE,
                message: USER_NOT_EXISTS,
            }
        }
        return {
            success: true,
            data: {
                role: user.role,
                _id: user._id,
                email: user.email,
                gender: user.gender,
                dateOfBirth: user.dateOfBirth,
                firstName: user.firstName,
                lastName: user.lastName,
                companyId: user.companyId,
            }
        }
    } catch (error) {
        return handleErrors(error);
    }
}
