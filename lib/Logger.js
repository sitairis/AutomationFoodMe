const fs = require('fs');
const winston = require('winston');

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
                    level: 'info'
                }),
                new (require('winston-daily-rotate-file'))({
                    filename: `${logDir}/-results.log`,
                    timestamp: this.tsFormat,
                    datePattern: 'yyyy-MM-dd',
                    prepend: true,
                    level: env === 'development' ? 'verbose' : 'info'
                })
            ]
        });
    }

    /**
     * логирование для мотодов
     * @param className
     * @param methodName
     * @param text
     */
    step(className, methodName, text) {
        this._makeLogDir();
        this.logger.info(`${className} : ${methodName} - ${text}`);
    }

    /**
     * логирование для шагов теста
     * @param nameTest
     * @param number
     * @param text
     */
    testStep(nameTest, number, text) {
        this._makeLogDir();
        this.logger.info(`====================================================`);
        this.logger.info(`${nameTest.toUpperCase()} : step ${number} - ${text}`);
        this.logger.info(`====================================================`);
    }

    /**
     * проверяет наличие дириктории для логов. Если нет, то создаст новую
     * @private
     */
    _makeLogDir() {
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }
    }

    error(info) {
        this.logger.error(info);
    }
}
module.exports = new Logger();

