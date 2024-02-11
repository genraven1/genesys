FROM openjdk:17

WORKDIR /app

CMD ["./gradlew", "clean", "build"]

COPY build/libs/gradle-java-server-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]