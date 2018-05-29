const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        console.log('Unable to append to server.log');
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintainance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIT', (message) => {
    return message.toUpperCase();
})

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name: 'Shruthi',
    //     likes: ['Chocolate', 'Ice cream', 'Sleep']
    // });
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        message: 'Welcome to home'

    });
});



app.get('/about', (req, res) => {
    //res.send('About');
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});


app.listen(5500, () => {
    console.log('Server is up on port 5500');
});