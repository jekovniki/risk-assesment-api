import mongoose from "mongoose";
import { DATABASE } from "../utils/configuration";
import { IDatabaseConfiguration } from "../dtos/infrastructure";
import { logger } from "../utils/logger";

class Database {
    private host: string;
    private port: string;
    private database: string;
    private username: string;
    private password: string;

    constructor(configuration: IDatabaseConfiguration) {
        this.host = configuration.host;
        this.port = configuration.port.toString();
        this.database = configuration.database;
        this.username = configuration.user;
        this.password = configuration.password;
    }

    public connect(): void {
        // mongoose.connect(`mongodb://${this.username}:${this.password}@${this.host}:${this.port}/${this.database}`);
        mongoose.connect(`mongodb://${this.host}:${this.port}/${this.database}`);
        // console.log(`mongodb://${this.username}:${this.password}@${this.host}:${this.port}/${this.database}`)
        logger.info(`Database is connected on: ${this.host}:${this.port}`);
    }

    public async disconnect(): Promise<void> {
        await mongoose.disconnect();
        logger.info(`Database has been disconnected from: ${this.host}:${this.port}`);
    }
}

export const database = new Database({
    host: DATABASE.HOST,
    port: Number(DATABASE.PORT),
    database: DATABASE.NAME,
    user: DATABASE.USER,
    password: DATABASE.PASSWORD
});