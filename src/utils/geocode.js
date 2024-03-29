const request = require('postman-request');

const geocode =(address, callback)=> {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidGFueWFhemFydCIsImEiOiJjbDJnaDhtcm4wM29qM2RvajVrZDV1OGZiIn0.n-WH5HV9GLel0mfTOnZZXA'

    request({url, json: true}, (error, {body}={})=>{
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length===0) {
            callback ('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[1],
                latitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }

    })


}
module.exports = geocode;
