module.exports = <Key >{
  mongoURI: 'mongodb://localhost/connect_four',
  secretOrKey: process.env.SECRET_JWT_KEY
};

interface Key {
  mongoURI: string,
  secretOrKey: string
}