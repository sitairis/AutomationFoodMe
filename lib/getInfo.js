let utils = require('./utils');
const request = require("request");
const fs = require('fs');
let restaurants = require('../restaurants');

/**
 *
 * @param nameRest
 */
restaurants.array.forEach((curRest) => {
    request({method: 'get',
        url: `http://localhost:5000/api/${curRest.id}`,
        headers: {
            Accept:'application/json'
        },
        json: true
    }, (err, response) => {
        if (err) throw new Error(err);

        fs.appendFile('restaurantInfo.json', response.body, (error) => {
            if (error) throw new Error(error.message);
        })
    });
});


/**
 * get orderId
 */

    request({method: 'post',
        url: 'http://localhost:5000/api/order',
        headers: {
            ContentType: 'application/json',
            charset: 'UTF-8'
        }
    }, (err) => {
        if (err) throw new Error(err);
    }).pipe(fs.createWriteStream('orderId.json'));

