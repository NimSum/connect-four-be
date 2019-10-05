module.exports = <Key >{
  mongoURI: process.env.MONGO_URI,
  secretOrKey: process.env.SECRET_OR_KEY
};

interface Key {
  mongoURI: string,
  secretOrKey: string
}