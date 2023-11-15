import config from '../config/config.js';
import winston from "winston";

const { debugLevel } = config; 

export const logger = winston.createLogger({
    levels: {
        fatal:0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4,
    },
    transports: [
        new winston.transports.Console({
            level: debugLevel,
            format: winston.format.combine(
                winston.format.colorize({
                    fatal: 'red',
                    error: 'orange',
                    warning: 'yellow',
                    info: 'blue',
                    debug: 'white'
                }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({filename:'./logs/error.log', level: 'error'})
    ]
});