package com.github.genraven.gradlejavaserver.router;

import com.github.genraven.gradlejavaserver.handler.EquipmentHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class EquipmentRouter {

    @Bean
    public RouterFunction<ServerResponse> equipmentRouterMethod(final EquipmentHandler equipmentHandler) {
        return RouterFunctions.route()
                .path("/equipment/gears", builder -> builder
                        .GET("/", equipmentHandler::getAllGears)
                        .POST("/{name}", equipmentHandler::createGear)
                        .PUT("/{name}", equipmentHandler::updateGear)
                        .GET("/{name}", equipmentHandler::getGear))
                .build();
    }
}
