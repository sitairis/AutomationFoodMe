const winston = require('winston');
const fs = require('fs');
const env = process.env.NODE_ENV || 'development';
const logDir = 'log';

class Logger {

    constructor() {
        this.tsFormat = () => (new Date()).toLocaleTimeString();

        this.logger = new (winston.Logger)({
            transports: [
                new (winston.transports.Console)({
                    timestamp: this.tsFormat,
                    colorize: true,
                }),
                new (winston.transports.File)({
                    filename: `${logDir}/results.log`,
                    timestamp: this.tsFormat,
                    level: env === 'development' ? 'debug' : 'info'
                })
            ]
        });
    }

    step(className, methodName, text) {
        this.makeLogDir();
        this.logger.info(`${className.toUpperCase()} : ${methodName} - ${text}`);
    }

    makeLogDir() {
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }

    }
}
Logger.Number = 0;
module.exports = Logger;

