const express = require('express');
const PORT = 3000;
const app = express();
const hbs = require('hbs');
const path = require('path');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(PORT, () => {
  console.log('The app is running at http://localhost:' + PORT);
});
