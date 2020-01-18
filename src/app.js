const hbs = require('hbs');
const path = require('path');
const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');

// when we want to show dynamic content (dynamic html) then we need to use template engine. In node we have handlebars, but handlebars
// have strong support for Javascript so, in order to use with express we use hbs(short for handlebars) which internally uses the
// former mentioned handlebars

// in order to use "hbs" we need to tell express that we will be using different views, so we need to set some settings of Express
app.set('view engine', 'hbs');

// Express will always search for 'views' folder to look for hbs files that are required for dynamic templating, in order to customize it
app.set('views', path.join(__dirname, '../templates/views'));

//to reuse components in express
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

// A way to set path for loading an external file rather than inline HTML
app.use(express.static(publicDirectoryPath));

app.set('views');
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Nikhil'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'For any query, drop a mail to weathersupport@gmail.com',
    name: 'Nikhil'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Nikhil'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please enter an address'
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        console.log('Geocode error');
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, { summary, temp, precip }) => {
        if (error) {
          console.log('Forecast error');
          return res.send({ error });
        }
        res.send({
          forecast:
            summary +
            ' It is currently ' +
            temp +
            ' degrees out. There is a ' +
            precip +
            '% chance of rain.',
          location,
          address: req.query.address
        });
      });
    }
  );
});

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: 'Error Page',
    message: 'Help Article Not Found',
    name: 'Nikhil'
  });
});

app.get('/*', (req, res) => {
  res.render('error', {
    title: 'Error Page',
    message: 'Page Not Found',
    name: 'Nikhil'
  });
});

app.listen(3000, () => {
  console.log('Server is up and running');
});
