const mongoose = require('mongoose');

// Use MONGODB_URI if defined, else default to localhost connection
const mongoURI = process.env.MONGODB_URI || `mongodb://localhost/${process.env.DATABASE_NAME}`;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to MongoDB'));

db.once('open', function () {
  console.log('Connected to Database :: MongoDB');
});

module.exports = db;

