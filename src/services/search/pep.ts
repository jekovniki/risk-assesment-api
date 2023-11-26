import { handleErrors } from "../../utils/errors";
import { cache } from "../../libraries/cache";
import { getAllTimePEPListFromCommissionAgainstCorruption } from "../../jobs/commission-against-corruption";
import { StructuredPEPData } from "../../interfaces/pep/caciaf";
import { IErrorResponse } from "../../interfaces/base";

export async function getAllCACIAFPEPs(): Promise<{ success: boolean, data: StructuredPEPData[]} | IErrorResponse> {
    try {
        const savedData = await cache.get("pep_list");

        if (!savedData) {
            const pepList = await getAllTimePEPListFromCommissionAgainstCorruption();

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
    } catch (error) {
        return handleErrors(error);
    }
}