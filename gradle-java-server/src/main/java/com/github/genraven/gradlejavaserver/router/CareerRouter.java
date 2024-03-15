package com.github.genraven.gradlejavaserver.router;

import com.github.genraven.gradlejavaserver.handler.CareerHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class CareerRouter {
    @Bean
    public RouterFunction<ServerResponse> careerRouterMethod(final CareerHandler careerHandler) {
        return RouterFunctions.route()
                .path("/careers", builder -> builder
                        .GET("/", careerHandler::getAllCareers)
                        .POST("/{name}", careerHandler::createCareer)
                        .GET("/{name}", careerHandler::getCareer)
                        .PUT("/{name}", careerHandler::updateCareer))
                .build();
    }
}
