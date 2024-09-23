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
                        .GET("/{name}/talents/", campaignHandler::getTalentsByCampaign)
                        .POST("/{name}/talents/", campaignHandler::addTalentToCampaign)
                        .PUT("/{campaignName}/sessions/{sessionName}", campaignHandler::createSession)
                        .GET("/{campaignName}/sessions/{sessionName}", campaignHandler::getSession)
                        .PATCH("/{campaignName}/sessions/{sessionName}", campaignHandler::updateSession)
                        .PUT("/{campaignName}/sessions/{sessionName}/scenes/{sceneName}", campaignHandler::createScene)
                        .GET("/{campaignName}/sessions/{sessionName}/scenes/{sceneName}", campaignHandler::getScene)
                ).build();
    }
}
