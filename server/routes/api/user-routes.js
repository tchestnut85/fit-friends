const router = require('express').Router();
const { route } = require('.');
const User = require('../../models');
const { authMiddleware: auth, signToken } = require('../../utils/auth');

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

// Login a user
router.post('/login', async ({ body }, res) => {
	try {
		const user = await User.findOne({
			$or: [{ username: body.username }, { email: body.email }],
		});

		if (!user) {
			return res.status(400).json({ message: 'Invalid username or email.' });
		}

		const correctPassword = await user.isCorrectPassword(body.password);

		if (!correctPassword) {
			return res.status(400).json({ message: 'Invalid password.' });
		}

		const token = signToken(user);
		res.json({ user, token });
	} catch (err) {
		console.error(`Error: ${err.message}`);
		res.status(500).send({ message: `Server error: ${err.message}` });
	}
});

// Get all users
// Private route
router.get('/', auth, async (req, res) => {
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

// Get current logged in user's info user through jwt
// Private route
router.get('/me', auth, async ({ user = null, params }, res) => {
	try {
		const singleUser = await User.findOne({
			$or: [{ _id: user ? user._id : params.id }, { username: params.username }],
		}).select('-__v -password');

		if (!singleUser) {
			return res.status(404).json({ message: 'User not found.' });
		}

		res.json(singleUser);
	} catch (err) {
		console.error(`Error: ${err.message}`);
		res.status(500).send({ message: `Server error: ${err.message}` });
	}
});

// Get a single user by either their ID or Username
// Private route
router.get('/:user', auth, async ({ params }, res) => {
	try {
		// ! Need to use ID to find a user right now, finding by username is not currently working
		const singleUser = await User.findOne({
			$or: [{ _id: params.user }, { username: params.user }],
		}).select('-__v -password');

		if (!singleUser) {
			return res.status(404).json({ message: 'User not found.' });
		}

		res.json(singleUser);
	} catch (err) {
		console.error(`Error: ${err.message}`);
		res.status(500).send({ message: `Server error: ${err.message}` });
	}
});

// Edit a user
// Private route
router.put('/', auth, async ({ user, body }, res) => {
	console.log('user:', user);
	console.log('user id:', user._id);
	console.log('body:', body);

	try {
		const updatedUser = await User.findOneAndUpdate({ _id: user._id }, body, {
			new: true,
			runValidators: true,
		}).select('-password -__v');

		if (!updatedUser) {
			return res.status(404).json({ message: 'User not found.' });
		}

		res.json(updatedUser);
	} catch (err) {
		console.error(`Error: ${err.message}`);
		res.status(500).send({ message: `Server error: ${err.message}` });
	}
});

// Delete a user
// Private route

module.exports = router;
