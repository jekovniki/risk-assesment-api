import { atob } from "buffer";
import { TSignIn } from "../../types/auth";
import { hash } from "argon2";

export function decodeCredentials(credentials: TSignIn): TSignIn {
    return {
        ...credentials,
        password: atob(credentials.password)
    }
}

export async function encryptPassword(password: string): Promise<string> {
    return hash(password);
}