import { DATABASE } from "../utils/configuration";
import admin from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app'
import { logger } from "../utils/logger";

class Database {
    private hasConnected = false;

    constructor() {
    }

    connect() {
        if (this.hasConnected === true) {
            return;
        }
        initializeApp({ credential: admin.credential.cert(JSON.parse(DATABASE.PRIVATE_KEY)) });
        logger.info('App has been initialised');
        this.hasConnected = true;
    }

}

export const database = new Database();;