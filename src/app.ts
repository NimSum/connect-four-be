const express = require('express');
const router = require('./server/routes');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const eventManager = require('./webSocket/eventManager');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/api/v1', router);

app.use((req: any, res: any, next: any) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", (req, res) => {
	res.status(200).json({message: 'Connect four BE'})
});

const port = process.env.PORT || 3000;

const server = app.listen(port, (err: any) => {
  if (err) throw err;
  console.log(`Listening to requests on port ${port}...`)
});

const io = socket(server);

io.on('connection', (client: any) => {
  eventManager(client);
});

module.exports = server;