import { logger } from "./utils/logger";
import { server } from "./libraries/server";
import { database } from "./libraries/database";

(async function() {
    try {
        server.start();

    } catch (error) {
        logger.error(error);
        database.connect();
    }
})();