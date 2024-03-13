import ObjectDocumentModel from "../helpers/odm";
import { database } from "../libraries/database";

database.connect();

export interface IOrganizationModel extends Document {
    id: string;
    name: string;
    country: string;
    type: "Limited Company" | "Joint Stock Company" | "Other";
    createdAt: Date;
    updatedAt: Date;
    approved: Boolean;
}


const defaultProps = {
    createdAt: new Date(),
    updatedAt: new Date(),
    approved: true
}

export const OrganizationModel = new ObjectDocumentModel<IOrganizationModel>('organization', defaultProps);
