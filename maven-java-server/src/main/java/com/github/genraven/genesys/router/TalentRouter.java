package com.github.genraven.genesys.router;

import com.github.genraven.genesys.constants.TalentConstants;
import com.github.genraven.genesys.handler.PlayerHandler;
import com.github.genraven.genesys.handler.TalentHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.*;

@Configuration
public class TalentRouter {

    @Bean
    public RouterFunction<ServerResponse> talentRouter(final TalentHandler talentHandler) {
        return RouterFunctions.route()
                .path("/talents/", builder -> builder
                        .GET(talentHandler::getAllTalents)
                        .POST("{name}", talentHandler::createTalent)
                        .GET("{id}", talentHandler::getTalentById)
                        .PUT("{id}", talentHandler::updateTalent))
                .build();
    }
}
