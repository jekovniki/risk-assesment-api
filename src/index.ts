import { logger } from "./utils/logger";
import { server } from "./libraries/server";

(async function() {
    try {
        server.start();
    } catch (error) {
        logger.error(error);
    }
})();