const mongoose = require('mongoose');
const { mongoURI } = require('../../config/keys');
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch((error) => {
    throw new Error(error);
});
module.exports = mongoose;
//# sourceMappingURL=mongoDB.js.map