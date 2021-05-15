const router = require('express').Router();
const User = require('../../models');
const { authMiddleware, signToken } = require('../../utils/auth');

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
router.get('/', authMiddleware, async (req, res) => {
	try {
		const users = await User.find({})
			// .populate({ path: 'teams', select: '-__v' }) // activate later after Team model gets created
			.select('-__v -password -email')
			.sort({ createdAt: 'desc' });

		if (!users) {
			return res.status(400).json({ message: 'Users not found.' });
		}

		res.json(users);
	} catch (err) {
		console.error(`Error: ${err.message}`);
		res.status(500).send({ message: `Server error: ${err.message}` });
	}
});

module.exports = router;
