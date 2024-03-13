import { TAddOrganization } from "../dtos/organization";

import { OrganizationModel } from "../models/organization";
import { UserModel } from "../models/user";
import { EntityNotFoundError } from "../utils/errors/index";

export async function addOrganization(input: TAddOrganization): Promise<any> {
    await OrganizationModel.create(input as any);

    const result = await OrganizationModel.findOne('name', input.name);
    if (!result) {
        throw new EntityNotFoundError("Organization not found after creation");
    }

    await UserModel.updateOne( 'companyId' , { companyId: result.id });

    return result;
}

export async function getOrganization(id: string): Promise<any> {
    const result = await OrganizationModel.findById(id);
    if (!result) {
        throw new EntityNotFoundError();
    }

    return result;
}