import { USER_NOT_EXISTS } from "../utils/constants/errors";
import { IUserModel } from "../models/user";
import { UserModel } from "../models/user";

export async function getUserInformation(userId: string): Promise<IUserModel> {
    const user = await UserModel.findById(userId);
    if (user === null) {
        throw new Error(USER_NOT_EXISTS);
    }
    return user;
}


export async function addUserSearch(input : { search: string, userId: string, ongoingScreening: boolean}): Promise<any> {
    // const result = await UserSearchModel.create({
    //     user_id: input.userId,
    //     search: input.search,
    //     ongoingScreening: input.ongoingScreening
    // });

    // return result._id; // This is case_id
}

export async function getUserSearchHistory(userId: string) {
    // return await UserSearchModel.find({ user_id: userId });
}