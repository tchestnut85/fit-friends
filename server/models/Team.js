const { Schema, model } = require('mongoose');

const teamSchema = new Schema({
    teamName: {
        type: String,
        required: true,
        minLength: 6,
        trim: true,
    },
    challengeType: {
        type: String,
        required: true,
        trim: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    duration: {
        type: Number,
        required: true,
    },
});

const Team = model('Team', teamSchema);

module.exports = Team;
