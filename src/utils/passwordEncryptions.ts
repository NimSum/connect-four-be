export {};

const bcrypt = require("bcrypt");
const saltRounds: number = 10;

async function encryptText(text: string): Promise<string | object> {
	try {
		const hashedText: Promise<string> = await bcrypt.hash(text, saltRounds);
		return hashedText;
	} catch (err) {
		return err;
	}
}

async function compareEncryptedText(
	textOne: string,
	textTwo: string
): Promise<boolean | object> {
	return await bcrypt.compare(textOne, textTwo);
}

module.exports = {
	encryptText,
	compareEncryptedText
};
