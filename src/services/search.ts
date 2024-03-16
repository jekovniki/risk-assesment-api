import { searchOSPeople } from "../libraries/search";


export async function search(query: string): Promise<unknown> {

    return await searchOSPeople.search(query);
}