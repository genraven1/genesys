package com.github.genraven.gradlejavaserver.router;

import com.github.genraven.gradlejavaserver.handler.PlayerHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class PlayerRouter {

    @Bean
    public RouterFunction<ServerResponse> router(final PlayerHandler playerHandler) {
        return RouterFunctions.route()
                .path("/actors/players/", builder -> builder
                        .GET(playerHandler::getAllPlayers)
                        .POST("{name}", playerHandler::createPlayer)
                        .GET("{id}", playerHandler::getPlayer)
                        .PUT("{id}", playerHandler::updatePlayer))
                .build();
    }
}
