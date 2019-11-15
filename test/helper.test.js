const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

after(() => {
	mongoose.connection.collections.players.drop();
});
