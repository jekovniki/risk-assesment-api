import ObjectDocumentModel from "../helpers/odm";
import { database } from "../libraries/database";

database.connect();

export interface IUserSearchModel extends FirebaseFirestore.DocumentData {
    id: string;
    user_id: string;
    search: string;
    ongoingScreening: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const defaultProps = {
    createdAt: new Date(),
    updatedAt: new Date(),
}

export const UserSearchModel = new ObjectDocumentModel<IUserSearchModel>('search-history', defaultProps);