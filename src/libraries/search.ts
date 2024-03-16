import algoliasearch, { SearchClient, SearchIndex } from "algoliasearch";
import { logger } from "../utils/logger";

const indexedSearches = {
    OS_People: 'prod_OS-People'
}

class Search {
    private client: SearchClient;
    constructor(appId: string | undefined, apiKey: string | undefined) {
        if (!appId) {
            throw new Error('Could not initialise search - app id is missing');
        }
        if (!apiKey) {
            throw new Error('Could not initialise search - api key is missing');
        }
        this.client = algoliasearch(appId, apiKey);
        logger.info('Successfully connected to Algolia search');
    }

    public initialise(indexName: string): SearchIndex {
        return this.client.initIndex(indexName);
    }
}

export const search = new Search(process.env.SEARCH_APP_ID, process.env.SEARCH_API_KEY);

export const searchOSPeople = search.initialise(indexedSearches.OS_People);