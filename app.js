const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { StatusCode } = require('./constants/api');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '6301fe53346ab91f6b14a9cd',
  };
  next();
});
app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use('/*', (req, res) => {
  res.status(StatusCode.NOT_FOUND).send({ message: 'Путь не существует' });
});

app.listen(PORT);
