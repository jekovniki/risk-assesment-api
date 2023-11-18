import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import helmet from 'helmet';

import { IRestServer, IServerConfiguration } from "../interfaces/infrastructure";
import { SERVER } from "../utils/configuration";

import router from "../routes";
import { logger } from "../utils/logger";


class Server implements IRestServer {
    private server: Express;
    private port: number;
    private host: string;

    constructor(configuration: IServerConfiguration) {
        this.server = configuration.server;
        this.port = configuration.port;
        this.host = configuration.host;
    }

    public start(): void {
        this.server.listen(this.port, () => {
            logger.info(`Server is listening on: ${this.host}:${this.port}`);
        });
        this.middleware();
    }

    public getServer(): express.Express {
        return this.server;
    }

    public getPort(): number {
        return this.port;
    }

    private async middleware(): Promise<void> {
        this.server.use(bodyParser.json());
        this.server.use(cors({
            origin: SERVER.ORIGIN(),
            credentials: true
        }));
        this.server.use(helmet({
            crossOriginResourcePolicy: SERVER.ORIGIN() === true ? false : true
        }));
        this.server.use(router);
    }
}

export const server = new Server({
    port: SERVER.PORT,
    host: SERVER.HOST,
    server: express()
});