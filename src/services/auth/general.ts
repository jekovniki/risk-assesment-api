import { atob } from "buffer";
import { TSignIn } from "../../dtos/auth";
import { hash, verify } from "argon2";
import { OAuth2Client } from "google-auth-library";

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

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3001/api/v1/auth/auth/google/callback';

export const googleClient = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);