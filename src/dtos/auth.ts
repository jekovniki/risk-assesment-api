import z from 'zod';

export interface IUserAuthorizationData {
    userId: string,
    role: string
}

export const signInCredentials = z.object({
    email: z.string().min(1),
    password: z.string().min(8)
})

const signUpFields = z.object({
    repeatPassword: z.string().min(8),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
    dateOfBirth: z.string(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    plan: z.enum(['Free', 'Standard', 'Pro']) // Custom not available from FE
});

export const signUpData = z.object({
    ...signInCredentials.shape,
    ...signUpFields.shape
});

export type TSignIn = z.infer<typeof signInCredentials>;
export type TSignUpInput = z.infer<typeof signUpData>;

export interface IGoogleData {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
}