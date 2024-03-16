import z from 'zod';
import { COUNTRIES } from '../utils/constants/countries';

export const searchRequest = z.object({
    search: z.string().min(3),
    page: z.number().min(0).default(0),
    limit: z.number().min(0).default(5),
    // schema: z.string(),
    // nationality: z.string(),
    // country: z.string(),
    // gender: z.string(),
    // byAlias: z.boolean(),
    // ongoingScreening: z.boolean()
})
// .refine(data => {
//     return data.country ? COUNTRIES.some(country => country.code.toLowerCase() === data.country.toLowerCase()) : true;
// }, { message: "Invalid country code" } )
// .refine(data => {
//     const input = data.gender.toLowerCase();
//     return data.gender ? input === 'male' || input === 'female' || input === 'other' : true;
// }, { message: "Invalid gender type"})
// .refine(data => {
//     return data.nationality ? COUNTRIES.some(country => country.code.toLowerCase() === data.nationality.toLowerCase()) : true;
// }, { message: "Invalid nationality code" } )

export type TSearchRequest = z.infer<typeof searchRequest>;