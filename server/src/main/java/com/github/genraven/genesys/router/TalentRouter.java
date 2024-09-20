package com.github.genraven.genesys.router;

import com.github.genraven.genesys.handler.TalentHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.*;

@Configuration
public class TalentRouter {

    @Bean
    public RouterFunction<ServerResponse> talentRouterMethod(final TalentHandler talentHandler) {
        return RouterFunctions.route()
                .path("/talents", builder -> builder
                        .GET("/", talentHandler::getAllTalents)
                        .POST("/{name}", talentHandler::createTalent)
                        .GET("/{name}", talentHandler::getTalent)
                        .PUT("/{name}", talentHandler::updateTalent))
                .build();
    }
}
