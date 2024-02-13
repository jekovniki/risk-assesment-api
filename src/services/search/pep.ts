import { cache } from "../../libraries/cache";
import { StructuredPEPData } from "../../dtos/pep/caciaf";
import { IErrorResponse } from "../../dtos/base";
import PepModel from "../../models/caciaf";


export async function getAllCACIAFPEPs(): Promise<{ success: boolean, data: StructuredPEPData[] } | IErrorResponse> {
    const savedData = await cache.get("pep_list");

    if (!savedData) {
        const pepList = await PepModel.find();

        cache.set('pep_list', JSON.stringify(pepList));

        return {
            success: true,
            data: pepList
        }
    }

    return {
        success: true,
        data: JSON.parse(savedData)
    }
}