const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;
const expiration = '1h';

module.exports = {
	authMiddleware: function (req, res, next) {
		// Get token from body, query or headers
		let token = req.body.token || req.query.token || req.headers.authorization;

		if (req.headers.authorization) {
			token = token.split(' ').pop().trim();
		}

		// if no token, return request object
		if (!token) {
			return req;
		}

		try {
			const { data } = jwt.verify(token, secret, { maxAge: expiration });
			req.user = data;
		} catch (err) {
			console.error(`Error: ${err.message}`);
			res.status(401).json({ message: 'Token is invalid.' });
		}
	},

	signToken: function ({ username, name, _id }) {
		const payload = { username, name, _id };

		return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
	},
};
