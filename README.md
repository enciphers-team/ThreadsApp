# ThreadsApp 

### About the app & idea

As a web app security person, we already have a lot of awesome vulnerable web application projects available to learn web app security. The main idea behind creating ThreadsApp came when we (Team Enciphers), while taking some web hacking training, realised that the current vulnerable lab apps does not give a feel of real world web apps ...i.e. the app itself tells that it is a vulnerable web app. So, we wanted to create a real world like app which works fine, unless you start looking from a security point of view. 

ThreadsApp is a simple web app, which has some simple features like creating posts, uploading pics, managing accounts, admin functionality etc. If you do not look from a security perspective, the app would work just fine. The fun starts when you start looking at the app from a penetration tester's point of view. Then, you end up finding security flaws, like in any other web app. 

This being the first release, we tried to add some basic functionaliites and related vulnerabilities. Future releases will have more interesting vulnerabilities and functionalities. 



## Prerequisite for setting up the Lab

1. Install Node.js for your system

```
# Check these commands to verify if node is installed:
node -v
npm -v
```

2. Install MongoDB

NOTE: Be carefull while installing mongodb, as if the installation is not done properly the debugging of the error is very tedious.

## Setting Up the project

```
1) Run the command "git clone https://github.com/enciphers/ThreadsApp.git" to clone the repo locally.
2) Navigate to the downloaded folder `cd ThreadsApp`
3) Open the "config.env" file and fill in the required information given in the file.  
4) As some part of the application uses a S3 bucket, this needs to be created and configured properly. To setup this, create a s3 bucket on your AWS account, then fill the ACCESSKEYID, SECRETACCESSKEY, REGION, BUCKET_NAME values of your account in the env file. 
5) The value of "PORT" is the port number where the Nodejs backend application is running. The default value of the "PORT" is "4000".
6) The ".env" file exists in the "client" folder. In the ".env" file, the "PORT" value is the port where the front-end react application is running.The default value of `PORT` is "3000".
7) The `.env` file exists in the "client" folder. In the `.env` file, the value of "REACT_APP_API_BASE_URL" is the URL of the backend API & "PORT" is the port number for frontend.
8) MongoDB is used by the application hence it should be configured properly and should be running before you install/run the application.
9) Run the command "install:all_deps" in the "ThreadsApp" folder to install all dependencies required for API. 

`Note:` _The application should ask to autofill the database with some dummy data. If the above step does not ask to add dummy users to the app, use "npm run add_users" command to add dummy users manually, after the install is done._

11) Run the command "npm start" to start the application. The application will run on "http://localhost:3000". Here "3000" is the value of the "PORT" provided in the ".env" file in the client folder. Feel free to change the default port number. "3000" is the default value of "PORT". The server will run on port number "4000"
```

## Starting the Project

```
npm start
```

You should see a message `Connected to Moongose`, if that's the case then the project setup is done and all the prerequisite are installed properly
if that's not the case, create an [issue](https://github.com/enciphers/ThreadsApp/issues) with the error and screenshot.

#### Using the application

```
- Visit --> http://localhost:3000/home
- Here "3000" is the value of the "PORT" provided in the ".env" file in the client folder. 
- "3000" is the default value of "PORT".
- Sign up --> Sign in --> Explore the app --> Try to find vulnerabilities as you would in any other application. Remember, this is no CTF.
```

### NOTE:

1. Filling all information in both environment files is necessary to run the app.
2. Admin email address is `admin@threadsapp.co.in`, create an account using this email and this account will become admin account. There is a hidden page, which is only accessible to admin user. Try finding this :-) 
3. For the AWS s3 bucket, you need to fill correct information in the "config.env" file.
4. User profile pictures are saved in the "uploads" folder.
5. Post pictures are uploaded on s3 bucket.
6. You will get the option to add dummy data while installing dependencies of API. It will create 25 users and 25 posts and these users will follow each other randomly.
7. You can use the command "npm run add_users" to add dummy data again. New dummy data will replace old dummy data.
8. All Users and New Users section will show other users, but not yourself. 
9. Want to use a live version of the app {Hosted by Enciphers}, for training? Drop us an email at `training@enciphers.com`
10. Have you discovered more vulnerabilities in the app than the listed one [here](http://info.threadsapp.co.in/)? Drop us an email at `training@enciphers.com` and you may end up getting some cool swag if the vulnerability is super cool (High/Critical severity) :-) 


### Some Screenshots
![Alt text](/uploads/screely-1614355834783.png?raw=true "Optional Title")
![Alt text](/uploads/screely-1614355791180.png?raw=true "Optional Title")
![Alt text](/uploads/screely-1614355858120.png?raw=true "Optional Title")
![Alt text](/uploads/screely-1614355873639.png?raw=true "Optional Title")


--------------------
