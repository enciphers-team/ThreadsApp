const readline = require('readline');
const exec = require('child_process').exec;
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// Assuming you have a User model, adjust the import path as necessary
const User = require('./models/user');

// Function to check if users already exist in the database
async function checkUsersExist() {
  try {
    console.log('Checking if users exist...');
    const count = await User.countDocuments({});
    console.log(`Users count: ${count}`);
    return count > 0;
  } catch (err) {
    console.error("Error checking users:", err);
    process.exit(1);
  }
}

// Function to execute the create_user.js script
function addUser() {
  const filePath = path.join(__dirname, 'dummy_data', 'create_user.js');
  console.log('Started adding user, Please wait ...');
  exec(`node ${filePath}`, { env: process.env }, (err, stdout, stderr) => {
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

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Main logic
db.once('open', async function () {
  console.log('Connected to Database');

  // Determine if the script is running inside Docker
  if (process.env.RUNNING_IN_DOCKER === 'true') {
    const exist = await checkUsersExist();
    if (!exist) {
      addUser();
    } else {
      console.log('Users already exist, skipping addition.');
      process.exit();
    }
  } else {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('Do you want to add users with posts? If yes then type "yes" else type "no" ', async function(response) {
      if (response.toLocaleLowerCase() === 'yes') {
        const exist = await checkUsersExist();
        if (!exist) {
          addUser(); // Add users if none exist and user types 'yes'
        } else {
          console.log('Users already exist, skipping addition.');
          process.exit();
        }
      } else {
        console.log('User addition skipped.');
        process.exit();
      }
    });
  }
});
