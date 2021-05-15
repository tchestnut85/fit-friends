const express = require('express');
const path = require('path');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// Serve client/build as static assets if in Production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
	app.listen(PORT, () => console.log(`\n 🌍 Server running on Port ${PORT}! 🌍\n`));
});
