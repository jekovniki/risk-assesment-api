import winston, { format, transports } from 'winston';
import { ENVIRONMENT, LOG_MANAGEMENT } from '../utils/configuration';
const { Loggly } = require('winston-loggly-bulk');

const { combine, timestamp, printf, colorize, errors } = format

const customFormat = combine(
    errors({ stack: true, traces: 3, depth: 5, reason: true }),
    colorize(),
    timestamp({ format: 'DD-MMM-YYYY HH:mm:ss'}),
    printf((info) => {
        let message = `${info.timestamp} | ${info.level} | ${info.message}`;
        message += `${info.stack ? `| Stack: \n ${info.stack}` : ""}`;
        message += `${info.reason ? `\n Reason: \n ${JSON.stringify(info.reason)}` : ""}`;

        return message;
        }
    )
)

const allTransports = [
    new transports.Console({ format: customFormat })
]

class Logger {
    protected logger: winston.Logger;

    constructor() {
        this.logger = winston.createLogger({
            exitOnError: false,
            transports: allTransports,
            format: customFormat,
            level: ENVIRONMENT === 'prod' ? 'info' : 'debug'
        });
        // if (ENVIRONMENT !== 'local') {
        //     this.logger.add(new Loggly({
        //         token: LOG_MANAGEMENT.TOKEN,
        //         subdomain: LOG_MANAGEMENT.SUBDOMAIN,
        //         tags: [LOG_MANAGEMENT.DEFAULT_TAG, ENVIRONMENT],
        //         json: true
        //     }))
        // }
    }

    public info(message: any): void {
        this.logger.info(message);
    }

    public warning(message: any): void {
        this.logger.warn(message);
    }

    public error(message: any): void {
        this.logger.error(message);
    }
}

export const logger = new Logger();