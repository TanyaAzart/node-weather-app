const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/9ad1976944ec90b23e4b65130aed79f7/'+ longitude + ','+ latitude + '?units=si';
    request ( {url, json: true}, (error, {body})=>{
        if (error) {
            callback ('Unable to connect to weather server', undefined)
        } else if (body.error) {
            callback ('Unable to find location', undefined)
        } else {
            callback (undefined, `${body.daily.data[0].summary} 
            The temperature currently is ${body.currently.temperature} degrees,
            the chance of rain is ${body.currently.precipProbability} %`)
        }
    })

}



module.exports = forecast;