FROM node:20.10.0-slim AS build-node
WORKDIR /client

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

#RUN npm run build --production
#
#RUN npm install -g serve
#
#EXPOSE 3000
#
#CMD [ "npm", "start" ]
#CMD serve -s build

FROM maven:3.9.6-eclipse-temurin-17
WORKDIR ./java-server

COPY ./java-server/pom.xml .
COPY ./java-server/src src

RUN mvn clean install

FROM eclipse-temurin:17-jre-alpine
WORKDIR /genesys

COPY --from=build /java-server/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]