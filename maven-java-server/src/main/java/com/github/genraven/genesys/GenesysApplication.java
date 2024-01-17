package com.github.genraven.genesys;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.reactive.config.EnableWebFlux;

@EnableWebFlux
@SpringBootApplication
public class GenesysApplication {

	public static void main(String[] args) {
		SpringApplication.run(GenesysApplication.class, args);
	}

}
