const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();

//setUP Direction for Express 
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectoryPath = path.join(__dirname, '../views');
const partialPath = path.join(__dirname, '../components');

//setup hbs template engine.
app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath);
hbs.registerPartials(partialPath);


//setup static DIrectory To Serve
app.use(express.static(publicDirectoryPath));


//Setup Routes
app.get('', (req, res) => {
    res.render('index', {
        "title": "Weather"
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        "title": "About"
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        "title": "Help"
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.search) {
        return res.send({
            "error" : "You Must Provide A Seach Tearm"
        });
    }
    geocode(req.query.search, (error, {longtude, latitude, location} = {}) => {

        if(error) {
            return res.send({error});
        }
        forecast(latitude, longtude, (error, forecastData) => { 
            if(error) {
                return res.send({error});
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.search
            });
        })

    })
    
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        "title" : "Weather",
        "content": "ERROR 404 HELP ARTICLE NOT FOUND!"
    });
})


app.get('*', (req, res) => {
    res.render('404', {
        "title" : "Weather",
        "content" : "ERROR 404 PAGE NOT FOUND!"
    });
})

//setUp Server
app.listen(3000, () => {
    console.log('Server Is Run Up On Port 3000.');
})