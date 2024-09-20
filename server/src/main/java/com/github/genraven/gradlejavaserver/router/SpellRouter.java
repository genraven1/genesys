package com.github.genraven.gradlejavaserver.router;

import com.github.genraven.gradlejavaserver.handler.SpellHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class SpellRouter {

    @Bean
    public RouterFunction<ServerResponse> spellRouterMethod(final SpellHandler spellHandler) {
        return RouterFunctions.route()
                .path("/spells", builder -> builder
                        .GET("/", spellHandler::getAllSpells)
                        .POST("/{name}", spellHandler::createSpell)
                        .GET("/{name}", spellHandler::getSpell)
                        .PUT("/{name}", spellHandler::updateSpell))
                .build();
    }
}
