# NCTRC-Check-In-App

This project is the repository for the North Carolina Theraputic Riding Cetner Check-In App. The NCTRC must track who comes onto the property at all times for record tracking as well as COVID-19 contact tracing.

## Getting Started

1. Prerequisites

   - [Node 12 LTS or later](https://nodejs.org/en/download/) 
   - [Java 12.0.2](https://jdk.java.net/archive/)
   - [Maven 3.6.2 or later](https://maven.apache.org/download.cgi)

2. Installing

   1. Clone this repository
   2. Navigate to the frontend folder
   3. Run npm init
   4. Navigate to the backend folder
   5. 
  

3. Running
   1. Backend
      - Whenever you make a code change, you can rebuild with `mvn clean install`
      - After that finishes, `./run.sh` should start up the server no problem
   
   2. Frontend
      - navigate to the frontend folder of the cloned repo
      - run `npm start` to start your react-native project
      - the expo client will give instructions that you can follow depending on where you would like to run your app (i.e. browser, phone, etc.)
   
   
4. Warranty

## Testing

1. How to run tests
   - Frontend:
     1. Navigate to frontend folder
     2. Run `npx jest` or equivalently `npm test`
   - Backend
     1.  Navigate to the backend folder
     2. `mvn test`
2. Collecting test coverage:
   - Frontend: 
      1. Automatically collected with `npx jest` or its equivalents
   - Backend:
      1. `mvn install`
      2. Reports found in `target/site/jacoco/index.html`

## Deployment

1. Deployment Steps
   
   - This setup guide is made with the assumption that you are hosting the backend on an AWS EC2 instance and that you have an AWS account. If this is not the case, you will have to alter your methodology accordingly

   0. Create User account for DynamoDB

         - Instructions based on the tutorial found [here](https://docs.aws.amazon.com/sdk-for-java/v2/developer-guide/signup-create-iam-user.html)

         - Follow the above tutorial. The username can be anything, but make sure the access type is **Programmatic access**

         - On the next page it will ask you to create a group. Once again, the group name can be anything, but make sure that you check **AmazonDynamoDBFullAccess**

         - Go ahead and create the user, you don't need to change any more settings

         - It will bring you to a user page with Access key ID and secret. Go ahead and jot those down, youll need them in a bit

      1. Login to your AWS account and spin up an EC2 Instance in Ubuntu version 18.04 (Ubuntu 20 should also work, but it has only been tested with 18). Default settings are fine, and the instance can be as lightweight as you want (micro/nano).

         - Now we will open up the ports for the server

           - Click on the instance ID and navigate to the security tab

           - Click on the link under security groups

           - Click Edit inbound rules

           - Click Add Rule
           - Set the rule type to be custom TCP and the port range to be 6600
           - Set the Source to be anywhere
           - Click Add Rule
           - Set the rule type to be custom TCP and the port range to be 6700
           - Set the Source to be anywhere
           - Click save Rules

      2. SSH into your instance and update it

         - `sudo apt-get update && sudo apt-get upgrade`

      3. Install Java 12 JDK

         - Head over to [here](https://jdk.java.net/archive/) and scroll down to java 12.0.2, right click on Linux 64-bit tar.gz and click copy link address (as of the time of this writing, the most updated link is [this](https://download.java.net/java/GA/jdk12.0.2/e482c34c86bd4bf8b56c0b35558996b9/10/GPL/openjdk-12.0.2_linux-x64_bin.tar.gz)
         - run
           `wget https://download.java.net/java/GA/jdk12.0.2/e482c34c86bd4bf8b56c0b35558996b9/10/GPL/openjdk-12.0.2_linux-x64_bin.tar.gz`, replacing the URL with whatever your updated URL is if they have updated it since
         - unpack it
           `tar xvf openjdk-12.0.2_linux-x64_bin.tar.gz`
         - now we are setting the java home and path:

           - Run
             `sudo nano ~/.bash_profile`
           - Paste in

             ```bash
             export JAVA_HOME=/home/ubuntu/jdk-12.0.2
             export PATH=$JAVA_HOME/bin:$PATH
             ```

           - Reload the terminal
             `source ~/.bash_profile`
           - Now you should see Java 12 as the response to
             `java -version`

      4. Install Maven

         - `sudo apt-get install maven` is fine **IF** the maven version is at least 3.6.2 (This project is confirmed working with Maven version 3.6.2 and 3.6.3 but does **NOT** work with 3.6.- As of the writing of this readme that is not the case and you must install maven manually

           - Head to [The Maven Download Page](https://maven.apache.org/download.cgi) and download Apache Maven. Doing the same as with downloading Java 12 in step 3, right click on copy link address after downloading apache-maven-3.6.3-bin.tar.gz on your local
           - wget the link:
             `wget ftp://ftp.osuosl.org/pub/apache/maven/maven-3/3.6.3/binaries/apache-maven-3.6.3-bin.tar.gz`
           - Unzip the file:
             `tar xzvf apache-maven-3.6.3-bin.tar.gz`
           - Now we need to change the PATH enviornment variable again.
             `sudo nano ~/.bash_profile`
           - Make sure the file now looks like so:

           ```bash
              export JAVA_HOME=/home/ubuntu/jdk-12.0.2
              export PATH=$JAVA_HOME/bin:$PATH:/home/ubuntu/apache-maven-3.6.3/bin
           ```

           - Reload the terminal
             `source ~/.bash_profile`
           - Now you should see Maven output as the response to
             `mvn -version`

      5. Configure git user

         - Generate the SSH keys, make sure to replace the example email with your github email
           `ssh-keygen -t ed25519 -C "your_email@example.com"`
         - Hit enter to keep the defaults through all the options (no need for a password but if you want one that is fine)
         - We now want to upload the public key generated to github
           - Run and copy the output of
             `cat /home/ubuntu/.ssh/id_ed25519.pub`
           - Create a new SSH key on github and paste the result in the box asking for the key
           - See [Here](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account) for additional help

      6. Repo Setup

         - Clone the repo. As of the writing of this document the repo is owned by Fisherswamp, so the command to clone is `git clone git@github.com:Fisherswamp/NCTRC-Check-In-App.git`
         - You should now see a folder called 'NCTRC-Check-In-App'
         - Navigate to the following folder
           `cd NCTRC-Check-In-App/NCTRC/backend/src/main`
         - Create a resources directory
           `mkdir resources`
         - Navigate to the resources directory and create a keystore directory

           ```bash
            cd resources/
            mkdir keystore
            cd keystore
           ```

         - Create an auth.properties file with the shared authorization code between the frontend and the backend (can be any shared string)
           `echo "authKey=key_here" > auth.properties`

         - Make a database directory and move into it

           ```bash
           mkdir database
           cd database/
           ```

         - Create a database.properties file with the aws dynamodb authkeyId and secretAccessKey
           `nano database.properties`
         - Paste into it the following format, using the credentials provided in step 0:

         ```bash
            accessKeyId=ACCESS_KEY_ID_HERE
            secretAccessKey=ACCESS_KEY_SECRET_HERE
         ```

         - Return to the main directory of the backend
           `cd ~/NCTRC-Check-In-App/NCTRC/backend`

         - Verify that everything works with `mvn verify`
      
2. Production system
   - Where
   - Access
3. Pre-production environments
   - No pre-production environments
4. Components of the app
   - Database: DynamoDB
      
   - Repo:
4. CI/CD?
   - Neither are implemented

## Technologies Used

- Typescript
- Java
- React Native
- Jest
- Javalin
- DynamoDB

## Contributing

1. Resources to access
   - If you wish to contribute to this project please contact the NCTRC about contributing to their Check-In App. 
2. Standards
   - Each member should follow the Google Code style whenever applicable. The recommended linter is eslint. A maven plugin will be automatically added to format the code into the correct codestyle, and it is recommended but not required that team members install the google-java-format plugin which can be found here for InteliJ and here for Eclipse. More information can be found on Google’s GitHub Page.

## Authors

- Itai Rivkin-Fish: backend, database logic, backend testing
- Sarah Bost: frontend, UI, render testing
- Daniel Evora: integration of frontend and backend, integration testing

## License

## Acknowledgements

- We would like to mention our mentor, Benjamin Pollack, and professor, Jeff Terrel, for helping us build out this project. 
