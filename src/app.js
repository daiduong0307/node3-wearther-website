const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve 
app.use(express.static(publicDirectoryPath)) 

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Duong'
    })
})
app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About',
        name: 'Duong'
    })
})
app.get('/help', (req, res) =>{
    res.render('help', {
        helpText:'this is some text',
        title: 'Help',
        name: 'Duong'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
           error: 'You must provide a address term'
       })
   }

   geocode(req.query.address, (error, {latitude, longtitude, location} = {}) => {
    if(error){
       return res.send({ error })
    } 

    forecast(latitude, longtitude, (error, forecastData) => {
        if(error){
            return res.send({ error })
        }

        res.send({
            location: location,
            forecast: forecastData,
            address: req.query.address
        })
      })
    })

})

app.get('/products', (req, res ) => {
    if (!req.query.search){
         return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404' ,{
        title: '404',
        name:'Duong',
        errorMessage: 'artile not found'
    })
    
})

app.get('*', (req, res) => {
    res.render('404' ,{
        title: '404',
        name:'Duong',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})
