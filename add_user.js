const readline = require('readline');
const exec = require('child_process').exec;
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// Assuming you have a User model, adjust the import path as necessary
const User = require('./models/user');
const userData = require('./dummy_data/user_data');

// Function to check if specific users already exist in the database
async function checkAndAddUsers() {
  try {
    console.log('Checking and adding users if they do not exist...');
    const existingUsers = await User.find({ email: { $in: userData.map(user => user.email) } });
    const existingEmails = existingUsers.map(user => user.email);

    const usersToAdd = userData.filter(user => !existingEmails.includes(user.email));

    if (usersToAdd.length === 0) {
      console.log('All users from user_data.js already exist. No new users to add.');
      process.exit();
    } else {
      console.log(`Adding ${usersToAdd.length} new users...`);
      exec(`node ${path.join(__dirname, 'dummy_data', 'create_user.js')}`, { env: process.env }, (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          return;
        }
        if (stderr) console.log('stderr:', stderr);
        console.log(stdout);
        console.log('---------Users Added successfully----------');
        process.exit();
      });
    }
  } catch (err) {
    console.error("Error checking and adding users:", err);
    process.exit(1);
  }
}

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Main logic
db.once('open', async function () {
  console.log('Connected to Database');

  // Determine if the script is running inside Docker
  if (process.env.RUNNING_IN_DOCKER === 'true') {
    await checkAndAddUsers();
  } else {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('Do you want to add new users from user_data.js? If yes then type "yes" else type "no" ', async function(response) {
      if (response.toLocaleLowerCase() === 'yes') {
        await checkAndAddUsers();
      } else {
        console.log('User addition skipped.');
        process.exit();
      }
    });
  }
});

