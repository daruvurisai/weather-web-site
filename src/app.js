 const path = require('path') // path is low level node js function api
 const express = require('express') //requireing the express module
 const hbs = require('hbs')
 const geocode = require('./utils/geocode')
 const forecast = require('./utils/forecast')
 const app = express()//starting the express framewrok
 const port = process.env.PORT || 3000// setting heroku port 
 //Define Paths for express config or creating routes for the folder views and templates
 const publicdirect = path.join(__dirname ,'../public')
 const views = path.join(__dirname,'../templates/views')
 const partialpath = path.join(__dirname,'../templates/partials')
 //Setup handlebars engine and views location
 app.set('view engine','hbs')
 app.set('views',views)
 hbs.registerPartials(partialpath)
 //setup static directory to serve
 app.use(express.static(publicdirect))


 app.get('',(req,res)=>{
     res.render('index',{
         title:'Weather App',
         name:'Sai Krishna Daruvuri'
     })
 })
 app.get('/about',(req,res)=>{
        res.render('about',{
            title:'About Me',
            name:'Sai Krishna Daruvuri'
        })
 })
 app.get('/help',(req,res)=>{
        res.render('help',{
            message:'Do You Need Any Help',
            title:'Help',
            name:'Sai Krishna Daruvuri'
        })
 })
 
 
 app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please Provide a location to search'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })


    })
  
})

app.get('/help/*',(req,res)=>{
    res.render('helparticle',{
        message:'Help Article not found',
        name:'Sai Krishna Daruvuri'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        message:'Page not Found',
        name:'Sai Krishna Daruvuri'
    })
})
//setting up port variable 
 app.listen(port,()=>{//Mentioning the port to listen in the nserver
     console.log('server is up and runnign on port 3000')
 })
// requiring the direct html pages 
