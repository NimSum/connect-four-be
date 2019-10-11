//inside tests/test_helper.js
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/connect_four_test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}); 

mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
        console.warn('Error : ',error);
    });

beforeEach((done) => {
    mongoose.connection.collections.players.drop(() => done()); 
});

after((done) => {
  mongoose.connection.collections.players.drop(() => done());
});