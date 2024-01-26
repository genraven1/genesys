package com.github.genraven.gradlejavaserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;

@SpringBootApplication(exclude={MongoAutoConfiguration.class})
public class GradleJavaServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(GradleJavaServerApplication.class, args);
	}

}
