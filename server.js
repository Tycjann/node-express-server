const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
// const upload = multer({ dest: 'public/uploads/' });
const upload = multer({ storage: storage });

const app = express();

// Middleware: Whole folders sharing
app.use(express.static(path.join(__dirname, '/public')));

// Middleware: Forms support
app.use(express.urlencoded({ extended: false }));

// Middleware: Receiving data in JSON format
app.use(express.json());

// Handlebars
app.engine('hbs', hbs({ 
  extname: 'hbs', 
  defaultLayout: 'main-light' 
}));
app.set('view engine', 'hbs');

// Endpoint: Support form
app.post('/contact/send-message', upload.single('project_design'), (req, res) => {

  const { author, sender, title, message } = req.body;
  const originalname = (req.file) ? req.file['originalname'] : '';

  if (author && sender && title && message && originalname) {
    res.render('contact', { file_name: originalname, layout: 'main-dark', isSent: true });
    // console.log(originalname, 'The message has been sent!');
    // res.send(req.file);
  }
  else {
    res.render('contact', { layout: 'main-dark', isError: true });
    // console.log(originalname, 'You can\'t leave fields empty!');
  }
});

// Endpoint: other pages
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

app.get('/contact', (req, res) => {
  res.render('contact', { layout: 'main-dark' });
});

// Endpoint: not found pages
app.use((req, res) => {
  if (res.status(404)) res.render('404');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});