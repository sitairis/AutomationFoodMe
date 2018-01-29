const request = require("request");
const fs = require('fs');
let restaurants = require('../restaurants');



request({method: 'get',
    url: 'http://localhost:5000/api/restaurant',
    headers: {
        Accept: 'application/json'
    },
    json: true
}, (err, responce) => {
    if (err) throw new Error(err);

    let objForAllRst = {
        array: responce.body
    };

    fs.writeFile("./restaurants.json", JSON.stringify(objForAllRst), (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("File has been created");
    });

});

let objForRestInfo = [];

fs.writeFile("./restaurantInfo.json", JSON.stringify(objForRestInfo), (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("File has been created");
});



let arrr = restaurants.array.map((curRest) => curRest.id);

// console.log(arrr);


arrr.forEach((a) => {
    request({
        method: 'get',
        url: `http://localhost:5000/api/restaurant/${a}`,
        headers: {
            Accept: 'application/json'
        },
        json: true
    }, (err, resp) => {
        if (err) throw new Error(err);

        fs.readFile('./restaurantInfo.json', (err, data) => {
            if (err) throw new Error(err.message);

            let obj = JSON.parse(data);

            obj.push(resp.body);

            fs.writeFile('./restaurantInfo.json', JSON.stringify(obj), (error) => {
                if (error) throw new Error(error.message);

                console.log("File has been update");
            })
        });

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
    }).pipe(fs.createWriteStream('./orderId.json'));

