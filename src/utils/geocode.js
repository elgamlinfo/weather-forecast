const request = require('request');




const geoCode = (address, callback) => {

    const geoCodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibW9zdGFmYWVsZ2FtbCIsImEiOiJjazc3bHhqeW8wOGMxM3FwaHh5MzEydDRmIn0.vgO_ru2kefHXGcK98Ns09Q`;
    
    request({url: geoCodeUrl, json: true}, (error, response) => {
        if (error) {
            callback('Location Not Found!!',undefined);
        }else if (response.body.error) {
            callback('Location Not Found!!',undefined);
        }else {
            callback(undefined, {
                    longtude: response.body.features[0].center[0],
                    latitude: response.body.features[0].center[1],
                    location: response.body.features[0].place_name
            });
        }
    })
}


module.exports = geoCode
