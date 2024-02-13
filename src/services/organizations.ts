import { TAddOrganization } from "../dtos/organization";
import OrganizationModel, { IOrganizationModel } from "../models/organization";
import UserModel from "../models/user";
import { EntityNotFoundError } from "../utils/errors/index";

export async function addOrganization(input: TAddOrganization): Promise<IOrganizationModel> {
    await OrganizationModel.create(input);

    const result = await OrganizationModel.findOne({ 'name': input.name});
    if (!result) {
        throw new EntityNotFoundError("Organization not found after creation");
    }

    await UserModel.updateOne({ companyId: result._id });

    return result;
}

export async function getOrganization(id: string): Promise<IOrganizationModel> {
    const result = await OrganizationModel.findById(id);
    if (!result) {
        throw new EntityNotFoundError();
    }

    return result;
}