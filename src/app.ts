const express = require('express');
const router = require('./server/routes');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const eventManager = require('./webSocket/eventManager');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/api/v1', router);

const port = process.env.NODE_ENV === 'test' ? 3005 : 3000;

const server = app.listen(port, (err: any) => {
  if (err) throw err;
  console.log(`Listening to requests on port ${port}...`)
});

const io = socket(server);

io.on('connection', (client: any) => {
  eventManager(client);
});

module.exports = server;