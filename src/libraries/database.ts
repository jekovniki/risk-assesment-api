import { DATABASE } from "../utils/configuration";
const admin = require("firebase-admin");

class Database {
    private serviceAccount;
    constructor(privateKey: string) {
        this.serviceAccount = privateKey;
    }

    public connect(): void {
        admin.initializeApp({
            credential: admin.credential.cert(this.serviceAccount)
          });
    }
}

export const database = new Database(DATABASE.PRIVATE_KEY);