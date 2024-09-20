package com.github.genraven.gradlejavaserver.router;

import com.github.genraven.gradlejavaserver.handler.QualityHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class QualityRouter {

    @Bean
    public RouterFunction<ServerResponse> qualityRouterMethod(final QualityHandler qualityHandler) {
        return RouterFunctions.route()
                .path("/qualities", builder -> builder
                        .GET("/", qualityHandler::getAllQualities)
                        .GET("/{name}", qualityHandler::getQuality)
                        .POST("/{name}", qualityHandler::createQuality)
                        .PUT("/{name}", qualityHandler::updateQuality))
                .build();
    }
}
