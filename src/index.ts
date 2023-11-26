import { logger } from "./utils/logger";
import { server } from "./libraries/server";
import { database } from "./libraries/database";
import { cache } from "./libraries/cache";
import { scheduledJobs } from "./jobs";

(async function() {
    try {
        server.start();
        database.connect();
        await scheduledJobs();
        await cache.clearAll();
    } catch (error) {
        logger.error(error);
    }
})();