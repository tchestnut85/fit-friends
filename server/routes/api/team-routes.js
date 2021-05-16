const router = require('express').Router();
const Team = require('../../models/Team');
const { authMiddleware: auth, signToken } = require('../../utils/auth');

// Create a team
// Post route - Private
router.post('/', auth, async ({ body }, res) => {
    try {
        const team = await Team.create(body);

        if (!team) {
            return res.status(400).json({
                message: 'There was an error when creating the team.',
            });
        }

        res.json(team);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        res.status(500).send({
            message: `Server error: ${err.message}`,
        });
    }
});

// Get all teams that a user belongs to
// Get route - private

// Get a single team that a user belongs to
// Get route - private

// Add user to a team
// Put route - private

// Remove user from a team
// Put route - private

// Delete a team
// Delete route - private

module.exports = router;
