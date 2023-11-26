import { logger } from "./utils/logger";
import { server } from "./libraries/server";
import { database } from "./libraries/database";
import { cache } from "./libraries/cache";

(async function() {
    try {
        server.start();
        database.connect();
        await cache.clearAll();
    } catch (error) {
        logger.error(error);
    }
})();