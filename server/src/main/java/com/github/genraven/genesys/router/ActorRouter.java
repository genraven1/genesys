package com.github.genraven.genesys.router;

import com.github.genraven.genesys.handler.ActorHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class ActorRouter {

    @Bean
    public RouterFunction<ServerResponse> actorRouterMethod(final ActorHandler actorHandler) {
        return RouterFunctions.route()
                .path("/actors/players", builder -> builder
                        .GET("/", actorHandler::getAllPlayers)
                        .POST("/{name}", actorHandler::createPlayer)
                        .GET("/{name}", actorHandler::getPlayer)
                        .PUT("/{name}", actorHandler::updatePlayer))
                .path("/actors/nemeses", builder -> builder
                        .GET("/", actorHandler::getAllNemeses)
                        .POST("/{name}", actorHandler::createNemesis)
                        .GET("/{name}", actorHandler::getNemesis)
                        .PUT("/{name}", actorHandler::updateNemesis))
                .path("/rivals", builder -> builder
                        .GET("/{name}", actorHandler::getRival)
                        .PUT("/{name}", actorHandler::updateRival))
                .path("/campaigns/{name}", builder -> builder
                        .POST("/rivals/", actorHandler::getAllRivals)
                        .POST("/rivals/{rivalName}", actorHandler::createRival)
                )
                .path("/actors/minions", builder -> builder
                        .GET("/", actorHandler::getAllMinions)
                        .POST("/{name}", actorHandler::createMinion)
                        .GET("/{name}", actorHandler::getMinion)
                        .PUT("/{name}", actorHandler::updateMinion))
                .build();
    }
}