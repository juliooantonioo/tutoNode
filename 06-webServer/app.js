
const express = require('express');
const app = express();
const hbs = require('hbs');


app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home', {
    nombre: 'Julio Vallejos',
    curso: 'node'
  })
})

app.get('/generic', (req, res) => {
  res.render('generic')
});

app.get('/elements', (req, res) => {
  res.render('elements')
});

// app.get('*', (req, res) => {
//   res.sendFile(__dirname + '/public/404.html')
// });

app.listen(8080);
