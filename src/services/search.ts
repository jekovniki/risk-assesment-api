import { TSearchRequest } from "../dtos/search";
import EntityModel, { IEntityModel } from "../models/entity";
import { EntityNotFoundError } from "../utils/errors/index";

export async function findPEP(data : TSearchRequest): Promise<IEntityModel[]> {
    const query = getQuery(data);
    const limit = data.limit ? data.limit : 20;
    const page = data.page ? data.page : 0;
    const skip = page * limit;

    const result = await EntityModel.find(query)
    .skip(skip)
    .limit(limit);

    if (!result.length) {
        throw new EntityNotFoundError();
    }

    return result;
}

export function getQuery(data: TSearchRequest): Record<string, any> {
    const query: Record<string, any> = data.byAlias ? { 
        "properties.alias": { "$in" : [data.search] } 
    } : { caption: { $regex: new RegExp(data.search, "i") }};

    if (data.schema) {
        query.schema = data.schema
    }
    if (data.country) {
        query["properties.country"] = { "$in": [data.country]}
    }
    if (data.nationality) {
        query["properties.nationality"] = { "$in": [data.nationality]}
    }
    if (data.gender) {
        query["properties.gender"] = { "$in" : [data.gender.toLowerCase()]}
    }
    if (data.name) {
        query["properties.name"] = { "$in" : [data.name]}
    }
    if (data.firstName) {
        query["properties.firstName"] = { "$in" : [data.firstName]}
    }
    if (data.position) {
        query["properties.position"] = { "$in": [data.position]}
    }

    return query;
}