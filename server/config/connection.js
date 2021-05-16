const mongoose = require('mongoose');

// ! Turn mongoose debug mode on or off by commenting/uncommenting:
mongoose.set('debug', true);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/fit-friends', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

module.exports = mongoose.connection;
