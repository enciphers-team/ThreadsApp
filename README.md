Threads

## Prerequisite for setting up the Lab

1. Install Node.js for your system

```
# Check these commands
node -v
npm -v
```

2. Install MongoDB

NOTE: Be carefull while installing mongodb, as if the installation is not done properly the debugging of the error is very tedious.

## Setting Up the project

```
1) Run the command "git clone https://github.com/enciphers/ThreadsApp.git"
2) cd Threads
3) Open the "config.env" file and fill in the required information given in the file. The application won't run if all information is not filled in. For the AWS s3 bucket, you need to create the account on AWS and create the s3 bucket and fill the ACCESSKEYID, SECRETACCESSKEY, REGION, BUCKET_NAME values of your account.
4) Run the command "npm install" in the "Threads" folder to install all dependencies required for API.
5) Run the command "npm run client_install" to install all dependencies of react app.
5) Go to the client folder and open the ".env" file. Fill in the required information in the file. The port in the value of the variable "REACT_APP_API_BASE_URL"  should be equal to the value of "PORT" in the "config.env" file of the Threads folder.
6) Run the command "npm start" to start the application. The application will run on "http://localhost:3000/".Here "3000" is the value of the "PORT" provides the ".env" file in the client folder. So you need to replace the value of "3000" with the value of "PORT" in the ".env" file of the client.
"3000" is the default value of "PORT".
```

## Starting the Project

```
npm start
```

You should see a message `Connected to Moongose` in the terminal, if that's the case then the project setup is done and all the prerequisite were installed properly
if that's not the case, create an issue with the error and screenshot.

#### Using the application

```
Visit --> http://localhost:3000/home
Here "3000" is the value of the "PORT" provides the ".env" file in the client folder. So you need to replace the value of "3000" with the value of "PORT" in the ".env" file of the client.
"3000" is the default value of "PORT".
Create some users, then signin, play with API's etc
```

### NOTE:

1. Filling all information in both environment files is necessary to run the app.
2. Admin email address is "[admin@threadsapp.co.in](mailto:admin@threadsapp.co.in)".You can visit "http://localhost:3000/management" for the admin page.
3. For the AWS s3 bucket, you need to fill correct information in the "config.env" file.
4. User profile pictures are saved in the "uploads" folder.
5. Post pictures are uploaded on s3 bucket.
6. You will get the option to add dummy data while installing dependencies of API. It will create 25 users and 25 posts and this user will follow each other randomly.
7. Follow all the steps properly to run the application.
8. You can use the command "npm run add_users" to add dummy data again. New dummy data will replace old dummy data.