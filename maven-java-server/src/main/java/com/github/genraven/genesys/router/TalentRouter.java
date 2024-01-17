package com.github.genraven.genesys.router;

import com.github.genraven.genesys.constants.TalentConstants;
import com.github.genraven.genesys.handler.TalentHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.*;

@Configuration
public class TalentRouter {

    @Bean
    public RouterFunction<ServerResponse> routeGetTalentById(final TalentHandler talentHandler) {
        return RouterFunctions.route(RequestPredicates.GET(TalentConstants.GET_TALENT_BY_ID), talentHandler::getTalentById);
    }

    @Bean
    public RouterFunction<ServerResponse> routeCreateTalent(final TalentHandler talentHandler) {
        return RouterFunctions.route(RequestPredicates.POST(TalentConstants.CREATE_TALENT), talentHandler::createTalent);
    }
}
