#FROM maven:3.9.6-eclipse-temurin-17
#
#WORKDIR /app
#
#COPY .mvn/ .mvn
#COPY pom.xml .
#
#RUN mvn clean
#RUN mvn dependency:resolve
#
#COPY src ./src
#
#RUN mvn install
#
#EXPOSE 8080
#
#ENTRYPOINT ["java","-jar", "app.jar"]