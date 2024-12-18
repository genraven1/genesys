package com.github.genraven.genesys.router;

import com.github.genraven.genesys.handler.LoreHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class LoreRouter {

    @Bean
    public RouterFunction<ServerResponse> loreRouterMethod(final LoreHandler loreHandler) {
        return RouterFunctions.route()
                .path("/lore", builder -> builder
                        .GET("/", loreHandler::getAllLore))
                .path("/lore/organizations", builder -> builder
                        .GET("/", loreHandler::getAllOrganizations)
                        .POST("/{name}", loreHandler::createOrganization)
                        .PUT("/{name}", loreHandler::updateOrganization)
                        .GET("/{name}", loreHandler::getOrganization))
                .build();
    }
}
