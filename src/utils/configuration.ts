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