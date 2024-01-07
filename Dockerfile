FROM node:20 as client
WORKDIR /client
COPY client .
RUN npm i
RUN npm run build

FROM maven:3.9.6-eclipse-temurin-17 as server
WORKDIR /java-server
COPY java-server .
RUN mkdir -p src/main/resources/static
COPY --from=client /client/build src/main/resources/static
RUN mvn clean package

FROM eclipse-temurin:17-jre-alpine
COPY --from=server /java-server/target/genesys-0.0.1-SNAPSHOT.jar ./app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]