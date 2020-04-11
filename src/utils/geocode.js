const request = require('request')
const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?types=place&access_token=pk.eyJ1IjoiZGFydXZ1cmlzYWkiLCJhIjoiY2s4bWFqMmw1MGxzMzNncW9pcm91dzA2ZSJ9.usdKofhuXRKyaBXcq76MUQ&limit=1'
    
    request({url,json:true},(error,{body})=>{
         if (error){
              callback('Unable to connect to the location servoces',undefined)
         }
         else if (body.features.length===0){
              callback('Location Entered Incorrect,Please enter Correct location',undefined)
         }
         else{
              callback(undefined,{
                   latitude:body.features[0].center[1],
                   longitude:body.features[0].center[0],
                   location:body.features[0].place_name
              })
         }
    })
}
module.exports=geocode