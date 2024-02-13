import { TSearchRequest } from "../dtos/search";
import EntityModel from "../models/entity";
import { EntityNotFoundError } from "../utils/errors/index";

export async function findPEP({ search } : TSearchRequest): Promise<Record<string, any>[]> {
    const result = await EntityModel.find({ 
        caption: { $regex: new RegExp(search, "i") }
    });

    if (!result.length) {
        throw new EntityNotFoundError();
    }

    return result;
}