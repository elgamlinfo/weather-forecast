const request = require('request');

const foreCast = (latitude, longtude, callback) => {
    
    const url = `https://api.darksky.net/forecast/43587d4ea214f0a7c26596126d94bb59/${latitude},${longtude}`;
    
    request({url: url, json:true}, (error, response) => {
        if (error) {
            callback('Unable To Connect Weather Services!!', undefined);
        } else if (response.body.error) {
            callback("Location Not Found!!", undefined);
        }else {
            callback(undefined,`It's Currently ${Math.round((response.body.currently.temperature - 32)/1.8)} C Degrees Out. There IS A ${response.body.currently.precipProbability * 100}% Chance Of Rain`);
        }
    })


}

module.exports = foreCast;