package com.github.genraven.genesys.router;

import com.github.genraven.genesys.handler.CampaignHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class CampaignRouter {

    @Bean
    public RouterFunction<ServerResponse> campaignRouterMethod(final CampaignHandler campaignHandler) {
        return RouterFunctions.route()
                .path("/campaigns", builder -> builder
                        .GET("/", campaignHandler::getAllCampaigns)
                        .POST("/", campaignHandler::createCampaign)
                        .GET("/{name}", campaignHandler::getCampaign)
                        .PUT("/{name}", campaignHandler::updateCampaign)
                )
                .path("/current", builder -> builder
                        .PUT(campaignHandler::setCurrentCampaign)
                        .GET(campaignHandler::getCurrentCampaign)
                )
                .build();
    }
}
