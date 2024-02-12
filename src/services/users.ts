import UserModel from "../models/user";
import { USER_NOT_EXISTS } from "../utils/constants/errors";
import { IUserModel } from "../models/user";

export async function getUserInformation(userId: string): Promise<IUserModel> {
    const user = await UserModel.findById(userId);
    if (user === null) {
        throw new Error(USER_NOT_EXISTS);
    }
    return user;
}
