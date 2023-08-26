 # ThreadsApp 

### About the app & idea

As a web app security person, we already have a lot of awesome vulnerable web application projects available to learn web app security. The main idea behind creating ThreadsApp came when we (Team Enciphers), while taking some web hacking training, realised that the current vulnerable lab apps does not give a feel of real world web apps ...i.e. the app itself tells that it is a vulnerable web app. So, we wanted to create a real world like app which works fine, unless you start looking from a security point of view. 

ThreadsApp is a simple web app, which has some simple features like creating posts, uploading pics, managing accounts, admin functionality etc. If you do not look from a security perspective, the app would work just fine. The fun starts when you start looking at the app from a penetration tester's point of view. Then, you end up finding security flaws, like in any other web app. 

This being the first release, we tried to add some basic functionaliites and related vulnerabilities. Future releases will have more interesting vulnerabilities and functionalities. 



## Prerequisite for setting up the Lab

Before you begin, ensure you have the following software installed:

1. [MongoDB](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/#std-label-install-mdb-community-ubuntu) v6.

    Run below commands to install MongoDB V6.
    ```
    sudo apt-get install gnupg curl
    
    curl -fsSL https://pgp.mongodb.com/server-6.0.asc | \
       sudo gpg -o /etc/apt/trusted.gpg.d/mongodb-server-6.0.gpg \
       --dearmor
    
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
    
    sudo apt-get update
    
    sudo apt-get install -y mongodb-org
    
    sudo systemctl start mongod
    ```


2. [Node.js](https://www.linode.com/docs/guides/install-nodejs-on-ubuntu-22-04/#installing-a-specific-version) v16.17.3 or above.

    Run below commands to install Node.js v16.
    
    ```
    curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
    
    sudo apt-get install -y nodejs
    ```

## Checking Prerequisites

   To check if Node.js is installed, run the following command in your terminal:

   ```
   node -v
   ```
    
   If Node.js is installed, you will see the version number. If not, please download and install it from the official website.

   To check if MongoDB is installed, run:

   ```
   mongod --version
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

3. Update config.env file in the root of your project and set the following environment variables:

    ```
    ACCESSKEYID=your-access-key-id
    SECRETACCESSKEY=your-secret-access-key
    REGION=your-region
    BUCKET_NAME=your-bucket-name
    ```

4. Adding Test Users

    To add test users to your MongoDB database, run below command at root of project folder (i.e /ThreadsApp):

     ```
     npm run add_users
     ```

     This command populates the database with test user data for testing purposes.

### There are two ways to start the application one is on Local and one is for deployment on server.

## To Run Application in Local
   Start the application using:

   ```
   npm start
   ```

You should see a message `Connected to Moongose`, if that's the case then the project setup is done and all the prerequisite are installed properly
if that's not the case, create an [issue](https://github.com/enciphers/ThreadsApp/issues) with the error and screenshot.

This command starts the Node.js server(http://localhost:4000) and makes your application accessible at http://localhost:3000.

## To Deploy the Application on Server

1. Follow the installation steps above.

2. Update a .env file in client folder and set the following environment variables:

     ```
     REACT_APP_API_BASE_URL=http://<your-domain-name>/api/ // (for eg if you are deploying on domain example.com then give value as https://example.com/api/ otherwise if running on some instance without domain then give value as http://<your-instance-ip>:4000/)
     ```
     
     OR if you are deploying without nginx and no domain name (i.e running on instance with ip and no domain registered)
   
     ```
     REACT_APP_API_BASE_URL=http://<your-instance-ip>:4000/  // (for eg if you are deploying on instance with ip 10.10.10.10 then give value as https://10.10.10.10:4000/)
     ```

3. Build React Client

     Navigate to the client directory(cd /path/to/ThreadsApp/client) and build your React app:
     ```
     npm run build
     ```

4. Install pm2 to run applications on server:

     ```
     npm install pm2 -g
     ```
   
5. Start Server and Client with PM2.

     In the directory ThreadsApp(i.e root of repository), start the Node.js server with PM2:
     
     ```
     pm2 start server.js 4000 --name 'ThreadsAppServer'
     ```

     In the client directory, start the React app with PM2:
     
     ```
     pm2 start npm --name 'ThreadsAppClient' -- start
     ```

##### steps below are required only if you are deploying the application on some public domain.
Otherwise if you are not using a domain but running instance to run your app, then your application should be accessible with url `http://<your-instance-ip>:3000`.

5. [Install Certbot](https://www.digitalocean.com/community/tutorials/how-to-use-certbot-standalone-mode-to-retrieve-let-s-encrypt-ssl-certificates-on-ubuntu-20-04)

     Install Certbot to obtain SSL certificates: 
     
     ```
     sudo apt-get update
     sudo apt-get install certbot python3-certbot-nginx
     ```

6. Get SSL certificates and Configure Nginx

     Create an Nginx configuration file:
     
     ```
     sudo vim /etc/nginx/sites-available/default
     ```

   Copy and paste the Nginx configuration below at the end of the file. Change your-domain-name with your valid domain name and then paste to the file.
     
     ```
     server {
         listen 80;
         server_name your-domain-name www.your-domain-name;
     
         location / {
             return 301 https://$host$request_uri;
         }
     }
     ```

     Run Certbot to obtain SSL certificates for your domain: 
     
     ```
     sudo certbot certonly --nginx
     ```

     Run below commands to update nginx configuration with generated ssl certificates (Change your-domain-name with valid domain name you registered):

     ```
     sudo vim /etc/nginx/sites-available/your-domain-name
     ```
     
     Copy and paste the Nginx configuration below into this file. Change your-domain-name with your valid domain name and then paste to the file.
     
     ```
     server {
         listen 80;
         server_name your-domain-name www.your-domain-name;
     
         location / {
             return 301 https://$host$request_uri;
         }
     }
     
     server {
         listen 443 ssl;
         server_name your-domain-name www.your-domain-name;
     
         ssl_certificate /etc/letsencrypt/live/your-domain-name/fullchain.pem;
         ssl_certificate_key /etc/letsencrypt/live/your-domain-name/privkey.pem;
     
         # Other SSL-related settings
     
         location / {
             proxy_pass http://localhost:3000; # React app is running on port 3000
             proxy_set_header Host $host;
             proxy_set_header X-Real-IP $remote_addr;
             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
             proxy_set_header X-Forwarded-Proto $scheme;
     
             proxy_http_version 1.1;
             proxy_set_header Upgrade $http_upgrade;
             proxy_set_header Connection "upgrade";
         }
     
         location /api/ {
             proxy_pass http://localhost:4000/;
         }
     }
     ```

9. Enable Nginx Site

     Create a symbolic link to enable the Nginx site(Replace your-domain-name with valid domain name):
     
     ```
     sudo ln -s /etc/nginx/sites-available/your-domain-name /etc/nginx/sites-enabled/
     ```

10. Test Nginx Configuration

     Test the Nginx configuration:
     
     ```
     sudo nginx -t
     ```
11. Restart Nginx

     Restart Nginx to apply the changes:
     
     ```
     sudo systemctl restart nginx
     ```

12. Access Your Application

    Access your application by visiting https://your-domain.com.


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
