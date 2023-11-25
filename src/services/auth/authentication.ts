import { handleErrors } from "../../utils/errors";
import { decodeCredentials } from "./general";
import { ICredentials, IUserData } from "../../interfaces/auth";
import { IBaseResponse } from "../../interfaces/base";

export async function signInWithCredentials(credentials: ICredentials): Promise<IUserData | IBaseResponse>{
    try {
        const decodedCredentials = decodeCredentials(credentials);
        
        return {
            success: true,
            data: null
        }
    } catch (error) {
        return handleErrors(error);
    }
}

export async function signInWithGoogle() {

}