let init = config => {
    let spec = null;

    let match = parseProcessArgv(process.argv);

    match.forEach(objProp => {
        switch (objProp.prop) {
            case 'specs':
                spec = objProp.value;
                break;
            case 'browser':
                config.capabilities.browserName = objProp.value;
                if (objProp.value !== 'chrome' && objProp.value !== 'firefox')
                    config.directConnect = false;
                break;
            case 'timeout':
                config.jasmineNodeOpts.defaultTimeoutInterval = parseInt(objProp.value);
                break;
            case 'threads':
                config.capabilities.maxInstances = Number.parseInt(objProp.value);
                config.capabilities.shardTestFiles = config.capabilities.maxInstances > 1;
                config.capabilities.chromeOptions = {
                    args: ['headless', 'disable-gpu']
                };
                break;
        }
    });

    config.specs.push(parseSpecPath(spec));

    config.onPrepare = () => {
        let AllureReporter = require('jasmine-allure-reporter');
        jasmine.getEnv().addReporter(new AllureReporter({
            resultsDir: 'allure-results'
        }));
    };

    config.beforeLaunch = () => {
        const request = require("request");
        const fs = require('fs');

        let path_conf = require('./path_conf');
        let req_conf = require('./lib/request_conf');

        let log = require('./lib/Logger');
        const tmpDir = 'tmp';

        request(req_conf.reqOptJson('get', 'restaurant', true), (err, response) => {
            if (err) throw new Error(err);

            if (!fs.existsSync(tmpDir)) {
                fs.mkdirSync(tmpDir);
            }

            let objForAllRst = {
                info: response.body
            };

            fs.writeFile(path_conf.pth_tmp(path_conf.fileNames.allRest), JSON.stringify(objForAllRst), err => {
                if (err) {
                    log.error(err);
                    throw new Error(err.message);
                }

                log.step('', '', "File restaurants.json has been created");
            });
        });
    };

    return config;
};
/**
 * вернет путь для тестов
 * @param spec
 * @returns {string}
 */
let parseSpecPath = spec => {
    let specPath = splitFunc(spec, ',');

    if (specPath[0] === '*') {
        return `./specs/*/*.js`;
    } else {
        let dirs = splitFunc(spec, '|')
            .map(dir => dir.endsWith(',') ? dir.slice(0, -1) : dir);

        return dirs.map(dir => dir.endsWith('.js') ? `./specs/${dir}` : `./specs/${dir}/*.js`);
    }
};
/**
 * вернет значения из командной строки
 * @param processArgv
 */
let parseProcessArgv = processArgv => splitFunc(`${processArgv}`,'--params')
        .map(el => splitFunc(el,'='))
        .filter(el => el.length > 1)
        .map(el => {
            return {
                prop: el[0].slice(1),
                value: el[1]
            }
        });
/**
 * делает split
 * @param str
 * @param delim
 */
let splitFunc = (str, delim) => str.split(delim);

exports.config = (function() {
    return init({
        specs: [],
        framework: 'jasmine',
        seleniumAddress: 'http://localhost:4444/wd/hub',
        baseUrl: "http://192.168.12.161:5000/#/",//ip
        capabilities: {
            browserName: 'chrome',
            shardTestFiles: false,
            maxInstances: 1
        }
    });
})();