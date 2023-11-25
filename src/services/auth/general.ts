import { atob } from "buffer";
import { ICredentials } from "../../interfaces/auth";

export function decodeCredentials(credentials: ICredentials): ICredentials {
    return {
        ...credentials,
        password: atob(credentials.password)
    }
}