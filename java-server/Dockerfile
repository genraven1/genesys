FROM maven:3.9.6-eclipse-temurin-17

COPY pom.xml .
COPY ./src src

RUN mvn clean install

COPY /target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]