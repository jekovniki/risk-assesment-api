import z from 'zod';

export const signInCredentials = z.object({
    email: z.string().min(1),
    password: z.string().min(8)
})

const signUpFields = z.object({
    repeatPassword: z.string().min(8),
    gender: z.string().refine(value => value === 'MALE' || value === 'FEMALE' || value === 'OTHER', {
        message: 'Gender must be MALE, FEMALE, or OTHER',
      }),
    dateOfBirth: z.string(),
    firstName: z.string().min(1),
    lastName: z.string().min(1)
});

export const signUpData = z.object({
    ...signInCredentials.shape,
    ...signUpFields.shape
});

export type TSignIn = z.infer<typeof signInCredentials>;
export type TSignUpInput = z.infer<typeof signUpData>;
