FROM maven:3.9.6-eclipse-temurin-17

WORKDIR /app

COPY .mvn/ .
COPY mvnw pom.xml ./

RUN ./mvnw dependency:resolve

COPY src ./src

CMD ["./mvnw", "spring-boot:run"]