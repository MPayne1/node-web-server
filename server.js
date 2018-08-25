const express = require('express');
const fs  = require('fs');
var app = express();
const hbs = require('hbs');

const port = process.env.PORT || 3000; // set port to environment var or 3000

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use( (req, res, next) => { // middleware to keep track of how server is working
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to connect to server.log');
    }
  });
  next();
});

//app.use( (req, res, next) => {
//  res.render('maintenance.hbs');
//});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',  () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  //res.send('<h1>Hello Express</h1>');
  res.render('home.hbs' , {
    pageTitle : 'Home page',
    welcomeMessage: 'Welcome'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Bad request'
  });
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
