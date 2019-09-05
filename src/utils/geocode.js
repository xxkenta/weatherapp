const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoieHhrZW50YSIsImEiOiJjanpqeHQycTQwMHgzM25wdHE0ajIxMnpsIn0.GKALEJxkHJgeAEnX2G74yQ&limit=1'

    request({url, strictSSL: false, json: true}, (error, {body})=>{
        if (error){
            callback('Unable to connect to location services.')
        } else if (body.features.length === 0){
            callback("That location does not exist.")
        } else{
            location = {
                place_name: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            }
            callback(undefined, location)
        }
    })
}

module.exports = geocode