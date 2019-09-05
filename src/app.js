const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
//setup static dir to serve
app.use(express.static(path.join(__dirname, '../public/')))

//setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../public/templates/views'))
hbs.registerPartials(path.join(__dirname, '../public/templates/partials'))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Kenta Ito'
    })
});

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Kenta Ito'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help Page',
        name: 'Kenta Ito',
        help_msg: 'This is the help message'
    })
})

app.get('/weather', ({query} = {}, res) => {
    if (!query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(query.address, (error, {latitude, longitude, place_name} ={}) =>{
        if (error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({ error })
            }
            return res.send({
                place_name,
                forecast: forecastData
            })
        })
    })
});

app.get('/products', (req, res) =>{
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
});

app.get('/help/*', (req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Kenta Ito',
        error: 'Help page not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Kenta Ito',
        error: 'Page not found'
    })
})

app.listen(port, () =>{
    console.log('Server is up on port ' + port)
});