const request = require('request')

const forecast = (lat, long, callback) => {
    const url = "https://api.darksky.net/forecast/ea48541f0f43d19be4cc40f0797d9605/" + lat +"," + long +"?units=us"

    request({url, strictSSL: false, json: true},(error, { body })=>{
        if (error){
            callback("Unable to connect to weather service.")
        } else if(body.error){
            callback(body.error)
        } else {
            currTemp = body.currently.temperature;
            currPrecipProb = body.currently.precipProbability;

            callback(undefined, body.daily.data[0].summary + " It is currently " + currTemp + " degrees out. There is a " + currPrecipProb + "% chance of rain.")
        }
    });
}

module.exports = forecast