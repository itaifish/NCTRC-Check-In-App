# NCTRC-Check-In-App

This project is the repository for the North Carolina Theraputic Riding Cetner Check-In App. The NCTRC must track who comes onto the property at all times for record tracking as well as COVID-19 contact tracing.

## Getting Started

1. Prerequisites

   - This setup guide is made with the assumption that you are hosting the backend on an AWS EC2 instance. If this is not the case, you will have to alter your methodology accordingly

2. Installing

   1. Login to your AWS account and spin up an EC2 Instance in Ubuntu version 18.04. Default settings are fine, and the instance can be as lightweight as you want (micro/nano).

   2. SSH into your instance and update it

      - `sudo apt-get update && sudo apt-get upgrade`

   3. Install Maven

      - `sudo apt-get install maven`

   4. Install Java 12 JDK

      - Head over to [here](https://jdk.java.net/archive/) and scroll down to java 12.0.2, right click on Linux 64-bit tar.gz and click copy link address (as of the time of this writing, the most updated link is [this](https://download.java.net/java/GA/jdk12.0.2/e482c34c86bd4bf8b56c0b35558996b9/10/GPL/openjdk-12.0.2_linux-x64_bin.tar.gz)
      - run `wget https://download.java.net/java/GA/jdk12.0.2/e482c34c86bd4bf8b56c0b35558996b9/10/GPL/openjdk-12.0.2_linux-x64_bin.tar.gz`, replacing the URL with whatever your updated URL is if they have updated it since
      - unpack it `tar xvf openjdk-12.0.2_linux-x64_bin.tar.gz`
      - now we are setting the java home and path:

        - Run: `sudo nano ~/.bash_profile`
        - Paste in

          ```bash
          export JAVA_HOME=/home/ubuntu/jdk-12.0.2
          export PATH=$JAVA_HOME/bin:$PATH
          ```

        - Reload the terminal `source ~/.bash_profile`
        - Now you should see Java 12 as the response to `java -version`

   4½ Configure git user

   5. Repo Setup
      - Clone the repo. As of the writing of this document the repo is owned by Fisherswamp, so the command to clone is `git clone git@github.com:Fisherswamp/NCTRC-Check-In-App.git`

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
