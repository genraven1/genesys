package com.github.genraven.genesys.router;

import com.github.genraven.genesys.handler.ArchetypeHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class ArchetypeRouter {
    @Bean
    public RouterFunction<ServerResponse> archetypeRouterMethod(final ArchetypeHandler archetypeHandler) {
        return RouterFunctions.route()
                .path("/archetypes", builder -> builder
                        .GET("/", archetypeHandler::getAllArchetypes)
                        .POST("/{name}", archetypeHandler::createArchetype)
                        .GET("/{name}", archetypeHandler::getArchetype)
                        .PUT("/{name}", archetypeHandler::updateArchetype))
                .build();
    }
}
