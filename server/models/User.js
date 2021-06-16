const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            minLength: 6,
            trim: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        bio: {
            type: String,
            trim: true,
            maxLength: 150,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            match: [/.+@.+\..+/, 'Enter a valid email address.'],
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minLength: 6,
        },
        // Teams the user is the owner/creator of
        teamsOwned: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Team',
            },
        ],
        // Teams the user is a member of
        teamMemberOf: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Team',
            },
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
    }
);

// Hash a new/updated password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// Compare a user's password when logging in
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
