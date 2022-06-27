const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.engine('hbs', hbs({ 
  extname: 'hbs', 
  defaultLayout: 'main-light' 
}));
app.set('view engine', 'hbs');

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});

app.use('/user', (req, res, next) => {
  res.render('login');
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/home', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about', { layout: 'main-dark' });
});

app.use((req, res) => {
  if (res.status(404)) res.render('404');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});