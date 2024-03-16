import { USER_NOT_EXISTS } from "../utils/constants/errors";
import { UserModel } from "../models/user";
import { UserSearchModel } from "../models/user-search";
import { getPlanDataByName } from "./plan";
import { IUserInformation } from "../dtos/users";

export async function getUserInformation(userId: string): Promise<IUserInformation> {
    const user = await UserModel.findById(userId);
    if (user === null) {
        throw new Error(USER_NOT_EXISTS);
    }
    const planData = getPlanDataByName(user.plan);
    return {
        ...user,
        ...planData
    };
}


export async function addUserSearch(input : { search: string, userId: string, ongoingScreening: boolean}): Promise<any> {
    const result = await UserSearchModel.create({
        user_id: input.userId,
        search: input.search,
        ongoingScreening: input.ongoingScreening
    } as any);

    return result.id;
}

export async function getUserSearchHistory(userId: string) {
    return await UserSearchModel.find('userId', userId);
}