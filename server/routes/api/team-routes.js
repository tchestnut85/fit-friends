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
            return res.status(404).json({ message: 'Team not found.' });
        }

        res.json(team);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        res.status(500).send({
            message: `Server error: ${err.message}`,
        });
    }
});

// Edit a team's info
// Put route - private
router.put('/:id', auth, async ({ body, params }, res) => {
    try {
        const updatedTeam = await Team.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        );

        if (!updatedTeam) {
            return res.status(404).json({ message: 'Team not found.' });
        }

        res.json(updatedTeam);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        res.status(500).send({
            message: `Server error: ${err.message}`,
        });
    }
});

// Add members to a team
// Put route - private
router.put('/:id/members', auth, async ({ body, params }, res) => {
    try {
        const updatedTeam = await Team.findOneAndUpdate(
            { _id: params.id },
            { $addToSet: { members: body.members } },
            { new: true, runValidators: true }
        );

        if (!updatedTeam) {
            return res.status(404).json({ message: 'Team not found.' });
        }

        res.json(updatedTeam);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        res.status(500).send({
            message: `Server error: ${err.message}`,
        });
    }
});

// Remove user from a team
// DELETE route - private
router.delete('/:teamId/members/:memberId', auth, async ({ params }, res) => {
    console.log('params:', params);
    try {
        const updatedTeam = await Team.findOneAndUpdate(
            { _id: params.teamId },
            { $pull: { members: params.memberId } },
            { new: true, runValidators: true }
        );

        if (!updatedTeam) {
            return res.status(404).json({ message: 'Team not found.' });
        }

        res.json(updatedTeam);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        res.status(500).send({
            message: `Server error: ${err.message}`,
        });
    }
});

// Delete a team
// Delete route - private
router.delete('/:teamId', auth, async ({ params }, res) => {
    try {
        const team = await Team.findOneAndDelete({ _id: params.teamId });

        if (!team) {
            return res.status(404).json({ message: 'Team not found.' });
        }

        const updatedUsers = await User.updateMany(
            { teams: params.teamId },
            { $pull: { teams: params.teamId } },
            { new: true, runValidators: true }
        );

        res.json(team);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        res.status(500).send({
            message: `Server error: ${err.message}`,
        });
    }
});

module.exports = router;
