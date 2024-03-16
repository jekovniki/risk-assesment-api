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
        userId: input.userId,
        search: input.search,
        ongoingScreening: input.ongoingScreening
    } as any);

    return result.id;
}

export async function hasAvailableSearches(userId: string):Promise<boolean> {
    const user = await UserModel.findById(userId);
    if (user === null) {
        throw new Error("Invalid user id");
    }
    const resources = getPlanDataByName(user.plan);
    const searches = await getTodaysSearches(userId);

    return resources.searches - searches.length > 0;
}

export async function getUserSearchHistory(userId: string) {
    return await UserSearchModel.find('userId', userId);
}

async function getTodaysSearches(userId: string): Promise<Record<string, any>[]> {
    const searches = await UserSearchModel.find('userId', userId) as any;
    const todaySearches = [];

    for (const search of searches) {
        const timeBetweenTwoDates = new Date().getTime() - search.createdAt._seconds * 1000;
        const oneDay = 86400000;
        if (oneDay > timeBetweenTwoDates) {
            todaySearches.push(search);
        }
    }

    return todaySearches;
}