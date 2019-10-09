const express = require('express');
const app = express();

const server = app.listen(3000, (err: any) => {
  if (err) throw err;
  console.log('Listening to requests on port 3000')
});

app.use(express.static('public'));
