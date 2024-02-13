import { atob } from "buffer";
import { TSignIn } from "../../dtos/auth";
import { hash, verify } from "argon2";

export function decodeCredentials(credentials: TSignIn): TSignIn {
    return {
        ...credentials,
        password: atob(credentials.password)
    }
}

export async function encryptPassword(password: string): Promise<string> {
    return hash(password);
}

export async function comparePassword(providedPassword: string, storedHash: string): Promise<boolean> {
    return verify(storedHash, providedPassword);
}