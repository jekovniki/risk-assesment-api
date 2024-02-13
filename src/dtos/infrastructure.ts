import { Express, RequestHandler} from 'express';
import Redis, { RedisKey } from 'ioredis';

export interface IBaseConfiguration {
    port: number;
    host: string;
}

export interface IServerConfiguration extends IBaseConfiguration {
    server: Express;
}

export interface IDatabaseConfiguration extends IBaseConfiguration {
    user: string;
    password: string;
    database: string;
}

export interface IUploadConfiguration {
    allowedMimeTypes: string[];
    maxFileSize: number;
}

export interface IRestServer {
    start(): void;
    getServer(): Express;
    getPort(): number;
}

export interface ICacheService {
    getClient(): Redis;
    get(key: RedisKey): Promise<string | null>;
    set(key: RedisKey, value: string | number | Buffer): Promise<string | undefined>;
    remove(keys: RedisKey[]): Promise<number>;
}

export interface IInternalFileSystem {
    read(path: string, encoding: BufferEncoding): string;
    write(path: string, data: string): void;
    delete(path: string): void;
    createDirectory(path: string): void;
    exists(path: string): boolean;
}

export interface IInternalFileManager {
    uploadSingle(path: string): RequestHandler;
    uploadMultiple(fieldName: string, maxCount: number): RequestHandler;
}