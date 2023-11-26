import { IUserModel } from "../models/user";

export interface IUserDataResponse {
    success: boolean,
    data: IUserModel
}