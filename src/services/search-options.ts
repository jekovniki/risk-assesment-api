import EntityModel from "../models/entity";

export async function getGenders() {
    const genders = await EntityModel.aggregate([
        { $project: { gender: { $ifNull: ["$properties.gender", null] } } },
        { $unwind: "$gender" },
        { $match: { gender: { $ne: null } } },
        { $group: { _id: '$gender' } },
        { $project: { _id: 0, gender: '$_id' } }
    ]);

    return genders.map(option => {
        return {
            label: option.gender,
            value: option.gender
        }
    });
}

export async function getEntityType() {
    const schemas = await EntityModel.aggregate([
        { $project: { schema: 1 } }, // Project the propertySchema field
        { $match: { schema: { $ne: null } } }, // Filter out null values
        { $group: { _id: '$schema' } }, // Group by propertySchema
        { $project: { _id: 0, schema: '$_id' } } // Rename _id to propertySchema
    ]);

    return schemas.map(option => {
        return {
            label: option.schema,
            value: option.schema
        }
    });
}