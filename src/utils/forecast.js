const request = require('request')

const forecast = (lat,long ,callback)=>{
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&units=imperial&appid=15227e973ed70138411f821f615e4478'

    request({url,json:true},(error,{body})=>{
         if (error){
              callback("Unable to connect to the location services",undefined)
         }
         else  if(body.message){
              callback('unable to find location',undefined)
         }
         else{
              callback(undefined,'It is '+body.main.temp+' °Fahrenheit in ' + body.name )
         }
    })
} 


module.exports=forecast

