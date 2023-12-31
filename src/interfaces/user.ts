import { IUserModel } from "../models/user";

export interface IUserDataResponse {
    success: boolean,
    data: IUserModel
}

export interface IUserInformationResponse {
    success: boolean,
    data:IUserInformation
}

interface IUserInformation {
    role: string,
    _id: string,
    email: string,
    gender: string,
    dateOfBirth: Date,
    firstName: string,
    lastName: string,
    companyId: string | null,
}