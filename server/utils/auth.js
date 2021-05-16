const jwt = require('jsonwebtoken');
require('dotenv').config();

const mySecret = process.env.JWT_SECRET;
const expiration = '1h';

module.exports = {
	// Function for authenticated routes to check for an autheticated user with a JWT
	authMiddleware: function (req, res, next) {
		// Get token from body, query or headers
		let token = req.query.token || req.headers.authorization || req.body.token;

		if (req.headers.authorization) {
			token = token.split(' ').pop().trim();
		}

		// if no token, return request object
		if (!token) {
			return req;
		}

		try {
			const { data } = jwt.verify(token, mySecret, { maxAge: expiration });
			req.user = data;
		} catch (err) {
			console.error(`Error: ${err.message}`);
			res.status(401).json({ message: 'Token is invalid.' });
		}
		next();
	},

	signToken: function ({ username, name, email, _id }) {
		const payload = { username, name, email, _id };

		return jwt.sign({ data: payload }, mySecret, { expiresIn: expiration });
	},
};
