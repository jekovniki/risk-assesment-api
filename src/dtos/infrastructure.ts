import { Express, RequestHandler} from 'express';

export interface IBaseConfiguration {
    port: number;
    host: string;
}

export interface IServerConfiguration extends IBaseConfiguration {
    server: Express;
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