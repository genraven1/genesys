package com.github.genraven.genesys;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;

@SpringBootApplication(exclude={MongoAutoConfiguration.class})
public class GenesysApplication {

	public static void main(String[] args) {
		SpringApplication.run(GenesysApplication.class, args);
	}

}
