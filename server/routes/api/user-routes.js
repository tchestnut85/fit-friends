const router = require('express').Router();
const User = require('../../models');
const { signToken } = require('../../utils/auth');

// Create a user
router.post('/', async ({ body }, res) => {
	try {
		let user = await User.findOne({ email: body.email });

		if (user) {
			return res.status(400).json({ message: 'User already exists.' });
		}

		user = await User.create(body);

		if (!user) {
			return res.status(400).json({ message: 'There was an error when creating the user.' });
		}

		const token = signToken(user);

		res.json({ user, token });
	} catch (err) {
		console.error(`Error: ${err.message}`);
		res.status(500).send({ message: `Server error: ${err.message}` });
	}
});

// Get all users
// router.get('/', (req, res) => {});

module.exports = router;
