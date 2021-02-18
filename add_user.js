const readline = require('readline');
const exec = require('child_process').exec;
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


rl.question(
  'Do you want to add users with posts? if yes than type "yes" else type "no" ',
  function (response) {
    if (response.toLocaleLowerCase() === 'yes') {
      const filePath = path.join(
        __dirname,
        './',
        'dummy_data',
        'create_user.js'
      );
      console.log('Started adding user,Please wait ...');
      exec(
        `node ${filePath}`,
        { env: { DATABASE_NAME: process.env.DATABASE_NAME } },
        (err, stdout, stderr) => {
          console.log(err);
          console.log(stderr);
          console.log(stdout);
          console.log('---------Users Added succesfully----------');
          process.exit();
        }
      );
    } else {
      process.exit();
    }
  }
);
