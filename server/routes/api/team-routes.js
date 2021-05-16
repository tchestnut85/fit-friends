const router = require('express').Router();
const { User, Team } = require('../../models');
const { authMiddleware: auth } = require('../../utils/auth');

// Create a team
// Post route - Private
router.post('/', auth, async ({ user, body }, res) => {
    try {
        const team = await Team.create(body);

        if (!team) {
            return res.status(400).json({
                message: 'There was an error when creating the team.',
            });
        }

        const updatedUser = await User.findOneAndUpdate(
            { _id: user._id },
            { $addToSet: { teams: team._id } },
            { new: true, runValidators: true }
        ).select('-password -__v');

        res.json({ team, updatedUser });
    } catch (err) {
        console.error(`Error: ${err.message}`);
        res.status(500).send({
            message: `Server error: ${err.message}`,
        });
    }
});

// Get a single team that a user belongs to
// Get route - private
router.get('/', auth, async ({ body }, res) => {
    try {
        const team = await Team.findOne({ _id: body._id });

        if (!team) {
            return res.status(400).json({ message: 'Team not found.' });
        }

        res.json(team);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        res.status(500).send({
            message: `Server error: ${err.message}`,
        });
    }
});

// Add user to a team
// Put route - private
router.put('/:id', auth, async ({ user, body, params }, res) => {
    console.log('user:', user);
    console.log('params:', params);
    console.log('body:', body);

    try {
        const updatedTeam = await Team.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        );

        res.json(updatedTeam);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        res.status(500).send({
            message: `Server error: ${err.message}`,
        });
    }
});

// Remove user from a team
// Put route - private

// Delete a team
// Delete route - private

module.exports = router;
