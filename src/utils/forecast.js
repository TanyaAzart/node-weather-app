const request = require('postman-request');

const forecast = (longitude, latitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=dd7d689819bb44f12eed0faa87a76a3d&query='+ longitude + ','+ latitude;
    request ( {url, json: true}, (error, {body})=>{
        if (error) {
            callback ('Unable to connect to weather server', undefined)
        } else if (body.error) {
            callback ('Unable to find location', undefined)
        } else {
            callback (undefined, `${body.current.weather_descriptions[0]} The temperature currently is ${body.current.temperature} degrees Celsius,
            the chance of rain is ${body.current.precip} %.`)
        }
    })

}



module.exports = forecast;

