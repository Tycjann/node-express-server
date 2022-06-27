const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();

app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'main' }));
// app.engine('.hbs', hbs());
// app.set('view engine', '.hbs');
app.set('view engine', 'hbs');

// app.get('/hello/:name', (req, res) => {
//   res.send(`Hello ${req.params.name}`);
// });

app.get('/hello/:name', (req, res) => {
  res.render('hello', { layout: false, name: req.params.name });
  // template: ./views/hello.hbs
});

app.use('/user', (req, res, next) => {
  // res.sendFile(path.join(__dirname, '/views/login.html'));
  // res.render('login', { layout: false });
  res.render('login');
});

// app.use((req, res, next) => {
//   res.show = (name) => {
//     res.sendFile(path.join(__dirname, `/views/${name}`));
//   };
//   next();
// });

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/home', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.use((req, res) => {
  // res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
  if (res.status(404)) res.render('404');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});