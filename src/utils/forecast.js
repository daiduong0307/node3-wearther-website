const request = require('request')

const forecast = (latitude, longtitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=294af6f0453b75676f97fc8ee7c2dedd&query='+ latitude + ',' + longtitude + '&units=m'
    
    request({url, json: true},(error, {body}) =>{
        if(error){
            callback('Unable to connect to location service', undefined)
        } else if(body.error){
            callback('Unable to find to find location. try another search ',undefined)
        } else{
            callback(undefined,
                body.current.weather_descriptions[0] +'. It is currently ' + body.current.temperature + '. i feel like ' + body.current.feelslike + "degress out. The humidity is " + body.current.humidity + '%.'
            )
        }
    })

}

module.exports = forecast