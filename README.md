# ThreadsApp 

### About the app & idea

As a web app security person, we already have a lot of awesome vulnerable web application projects available to learn web app security. The main idea behind creating ThreadsApp came when we (Team Enciphers), while taking some web hacking training, realised that the current vulnerable lab apps does not give a feel of real world web apps ...i.e. the app itself tells that it is a vulnerable web app. So, we wanted to create a real world like app which works fine, unless you start looking from a security point of view. 

ThreadsApp is a simple web app, which has some simple features like creating posts, uploading pics, managing accounts, admin functionality etc. If you do not look from a security perspective, the app would work just fine. The fun starts when you start looking at the app from a penetration tester's point of view. Then, you end up finding security flaws, like in any other web app. 

This being the first release, we tried to add some basic functionaliites and related vulnerabilities. Future releases will have more interesting vulnerabilities and functionalities. 



## Prerequisite for setting up the Lab

Before you begin, ensure you have the following software installed:

1. [Node.js](https://nodejs.org/dist/) v16.17.3 or above
2. [MongoDB](https://www.mongodb.com/docs/manual/installation/) v6

## Checking Prerequisites

To check if Node.js is installed, run the following command in your terminal:

```
node -v
```
If Node.js is installed, you will see the version number. If not, please download and install it from the official website.

To check if MongoDB is installed, run:
```
mongo --version
```
If MongoDB is installed, you will see the version information. If not, please follow the MongoDB installation guide for your system.

### Installation

Installation
1. Clone this repository to your local machine:

```
git clone https://github.com/enciphers/ThreadsApp.git
```
Navigate to the project directory:

```
cd path/to/ThreadsApp
```

2. Install all dependencies using the following command:

```
npm run install:all_deps
```

3. Create an .env file in the root of your project and set the following environment variables:

```
ACCESSKEYID=your-access-key-id
SECRETACCESSKEY=your-secret-access-key
REGION=your-region
BUCKET_NAME=your-bucket-name
REACT_APP_API_BASE_URL=http://localhost:4000
```

4. Adding Test Users
To add test users to your MongoDB database, run:

```
npm run add_users
```

This command populates the database with test user data for testing purposes.

## Running the Application
Start the application using:

```
npm start
```
You should see a message `Connected to Moongose`, if that's the case then the project setup is done and all the prerequisite are installed properly
if that's not the case, create an [issue](https://github.com/enciphers/ThreadsApp/issues) with the error and screenshot.

This command starts the Node.js server(http://localhost:4000) and makes your application accessible at http://localhost:3000.

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
