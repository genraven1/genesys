package com.github.genraven.gradlejavaserver.router;

import com.github.genraven.gradlejavaserver.handler.ActorHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class ActorRouter {

    @Bean
    public RouterFunction<ServerResponse> actorRouterMethod(final ActorHandler playerHandler) {
        return RouterFunctions.route()
                .path("/actors/players", builder -> builder
                        .GET("/", playerHandler::getAllPlayers)
                        .POST("/{name}", playerHandler::createPlayer)
                        .GET("/{name}", playerHandler::getPlayer)
                        .PUT("/{name}", playerHandler::updatePlayer))
                .build();
    }
}
