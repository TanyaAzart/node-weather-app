const path = require('path');
const express = require ('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Tanya'
    })
})
app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Tanya'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help page',
        name: 'Tanya',
        message: 'Everything gonna be all right!'
    })
})

app.get('/weather', (req, res)=>{
    const address = req.query.address;
    if(!address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(address, (error, {longitude, latitude, location}={})=>{
    
        if (error) {
            return res.send({
                error: error
            })
        }
    
        forecast(longitude, latitude,(error, forecastData)=> {
            res.send({
                forecast: forecastData,
                location
            })
        })
    })
    
})

app.get('/help/*', (req, res)=> {
    res.render('404', {
        title: '404 page',
        name: 'Tanya',
        message: 'Help article not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404 page',
        name: 'Tanya',
        message: 'Page not found'
    })
})



app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})

