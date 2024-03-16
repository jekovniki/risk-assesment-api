import { IUserModel } from "../models/user";

export interface IPlanData { 
    reports: number, 
    searches: number 
}

export interface IUserInformation extends IUserModel, IPlanData { }