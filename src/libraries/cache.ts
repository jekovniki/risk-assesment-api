import { Redis, RedisKey} from "ioredis";
import { CACHE } from "../utils/configuration";
import { IBaseConfiguration, ICacheService } from "../dtos/infrastructure";

class Cache implements ICacheService {
    protected client: Redis;
    protected port: number;
    protected host: string;

    constructor(configuration: IBaseConfiguration) {
        this.port = configuration.port;
        this.host = configuration.host;
        this.client = new Redis(this.port, this.host);
    }

    public getClient(): Redis {
        return this.client;
    }

    public async get(key: RedisKey): Promise<string | null> {
        return this.client.get(key, (error, result) => {
            if (error) {
                return null;
            }

            return result;
        })
    }

    public async set(
        key: RedisKey, 
        value: string | number | Buffer, 
        isExpiration:boolean = false, 
        expirationInSeconds: number | undefined = undefined
    ): Promise<string | undefined> {
        if(isExpiration) {
            const expirationTime = expirationInSeconds ?? 43200; // 43200 is 1 day;
            return this.client.set(key, value, 'EX', expirationTime);
        }
        
        return this.client.set(key, value);
    }

    public async remove(keys: RedisKey[]): Promise<number> {
        return this.client.del(keys);
    }

    public async clearAll(): Promise<void> {
        await this.client.flushall();
    }
}

// export const cache = new Cache({ port: CACHE.PORT, host: CACHE.HOST});