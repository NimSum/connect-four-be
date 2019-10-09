const express = require('express');
const router = require('./server/routes');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/api/v1', router());

const server = app.listen(3000, (err: any) => {
  if (err) throw err;
  console.log('Listening to requests on port 3000')
});

module.exports = app;