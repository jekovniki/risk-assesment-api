import ObjectDocumentModel from "../helpers/odm";
import { database } from "../libraries/database";

database.connect();

export interface IUserModel extends FirebaseFirestore.DocumentData {
    id: string;
    googleId: string | null;
    email: string;
    password: string | null;
    role: 'USER' | 'ADMIN';
    gender: "MALE" | "FEMALE" | "OTHER";
    createdAt: Date;
    updatedAt: Date;
    dateOfBirth: Date;
    lastLogin: Date | null;
    userDevice: string | null;
    firstName: string;
    lastName: string;
    companyId: string;
}

const defaultGender: 'MALE' = 'MALE';
const defaultUser: 'USER' = 'USER';

const defaultProps = {
    googleId: null,
    role: defaultUser,
    gender: defaultGender,
    createdAt: new Date(),
    updatedAt: new Date(),
    dateOfBirth: new Date(),
    lastLogin: null,
    userDevice: null,
    companyId: "1"
}

export const UserModel = new ObjectDocumentModel<IUserModel>('users', defaultProps);