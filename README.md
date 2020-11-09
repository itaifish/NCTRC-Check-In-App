# NCTRC-Check-In-App

This project is the repository for the North Carolina Theraputic Riding Cetner Check-In App. The NCTRC must track who comes onto the property at all times for record tracking as well as COVID-19 contact tracing.

## Getting Started

1. Prerequisites

   - This setup guide is made with the assumption that you are hosting the backend on an AWS EC2 instance. If this is not the case, you will have to alter your methodology accordingly

2. Installing

   1. Login to your AWS account and spin up an EC2 Instance in Ubuntu version 18.04. Default settings are fine, and the instance can be as lightweight as you want (micro/nano).

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
      - Paste into it the following format:

      ```bash
         accessKeyId=ACCESS_KEY_ID_HERE
         secretAccessKey=ACCESS_KEY_SECRET_HERE
      ```

      - Return to the main directory of the backend
        `cd ~/NCTRC-Check-In-App/NCTRC/backend`

3. Running locally
4. Warranty

## Testing

1. How to run tests
   - Frontend:
     1. Navigate to frontend folder
     2. Run `npx jest`
   - Backend
2. Other test commands

## Deployment

1. Production system
   - Where
   - Access
2. Pre-production environments
3. omponents of the app
4. I/CD?

## Technologies Used

- Typescript
- Java
- React Native
- Jest
- Javalin
- DynamoDB

## Contributing

1. Resources to access
2. Standards

## Authors

- Itai Rivkin-Fish: backend, database logic, backend testing
- Sarah Bost: frontend, UI, render testing
- Daniel Evora: integration of frontend and backend, integration testing

## License

## Acknowledgements
