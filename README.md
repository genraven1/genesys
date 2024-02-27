This project was created to be a fully functional Genesys RPG Virtual Table Top and GM Lore and Homebrew Content Creation Tool built by a solo devloper with a love for the Genesys RPG.

For those wishing to run the codebase locally. Follow the following directions.

CLIENT

Install node and npm
https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

Usee npm i to install all of the client dependencies

Use npm run start to run the program locally.

GRADLE JAVA SERVER
Repository is using Java 17, and Springboot 3.x.

Backend Server is run with ./gradlew clean build bootRun

Adding a connection string:
Create an .env file in the gradle-java-server root directory with the 

MongoDB
Currently using Atlas provided by MongoDB, which will hold 256MB of data. The application can also be used by a local or docker version using a different connection string.
Guide for creating an Atlas Cluster: https://www.mongodb.com/docs/atlas/getting-started/

Docker Compose
I have started trying to implement a docker compose setup for the appliation, however I was having issues getting the DB to connect to the backend, and deprioritized the work.
