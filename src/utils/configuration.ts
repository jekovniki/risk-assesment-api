import { config } from "dotenv";
import { validateEnvironmentVariable } from "./helpers/validators";

config();

export const SERVER = {
    HOST: validateEnvironmentVariable(process.env.REST_HOST),
    PORT: Number(validateEnvironmentVariable(process.env.REST_PORT)),
    ORIGIN: () => {
        if (validateEnvironmentVariable(process.env.REST_ORIGIN) === 'true') {
            return true;
        }

        return process.env.REST_ORIGIN;
    }
}

export const DATABASE = {
    HOST: validateEnvironmentVariable(process.env.DATABASE_HOST),
    PORT: validateEnvironmentVariable(process.env.DATABASE_PORT),
    USER: validateEnvironmentVariable(process.env.DATABASE_USER),
    PASSWORD: validateEnvironmentVariable(process.env.DATABASE_PASSWORD),
    NAME: validateEnvironmentVariable(process.env.DATABASE_NAME)
}

export const APP_CLIENT = {
    URL: validateEnvironmentVariable(process.env.APP_HOST) + ":" + validateEnvironmentVariable(process.env.APP_PORT) + "/"
}

export const CACHE = {
    HOST: validateEnvironmentVariable(process.env.CACHE_HOST),
    PORT: Number(validateEnvironmentVariable(process.env.CACHE_PORT))
}

export const ENVIRONMENT = validateEnvironmentVariable(process.env.ENVIRONMENT);

export const LOG_MANAGEMENT = {
    TOKEN: validateEnvironmentVariable(process.env.LOG_MANAGEMENT_TOKEN),
    SUBDOMAIN: validateEnvironmentVariable(process.env.LOG_MANAGEMENT_SUBDOMAIN),
    DEFAULT_TAG: validateEnvironmentVariable(process.env.LOG_MANAGEMENT_DEFAULT_TAG)
}

export const ACCESS_TOKEN = {
    SECRET: validateEnvironmentVariable(process.env.ACCESS_TOKEN_SECRET),
    ISSUER: validateEnvironmentVariable(process.env.ACCESS_TOKEN_ISSUER),
    ALGORITHM: validateEnvironmentVariable(process.env.ACCESS_TOKEN_ALGORITHM),
    LIFE: validateEnvironmentVariable(process.env.ACCESS_TOKEN_LIFE),
    LIFE_IN_MILLISECONDS: Number(validateEnvironmentVariable(process.env.ACCESS_TOKEN_IN_MILLISECONDS))
}

export const ACCESS_LEVEL = {
    UNAUTHORIZED: 1,
    USER: 2,
    COMPANY_LEADER: 5,
    ADMIN: 10
}

export const PEP_SOURCES = {
    CACIF: validateEnvironmentVariable(process.env.URL_FOR_COMMISISON_DATA)
}