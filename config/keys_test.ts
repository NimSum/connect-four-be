module.exports = <Key>{
	mongoURI: "mongodb://localhost/connect_four_test",
	secretKey: "SECRETDEVKEY"
};

interface Key {
	mongoURI: string;
	secretKey: string;
}
