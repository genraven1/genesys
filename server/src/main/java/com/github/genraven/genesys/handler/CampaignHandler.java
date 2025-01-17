package com.github.genraven.genesys.handler;

import com.github.genraven.genesys.domain.campaign.Campaign;
import com.github.genraven.genesys.service.CampaignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import static com.github.genraven.genesys.constants.CommonConstants.NAME;
import static org.springframework.web.reactive.function.BodyInserters.fromValue;

@Component
public class CampaignHandler {

    private final CampaignService campaignService;

    @Autowired
    public CampaignHandler(final CampaignService campaignService) {
        this.campaignService = campaignService;
    }

    public Mono<ServerResponse> getAllCampaigns(final ServerRequest serverRequest) {
        return campaignService.getAllCampaigns().collectList().flatMap(campaigns -> {
            if(campaigns.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fromValue(campaigns));
        });
    }

    public Mono<ServerResponse> getCampaign(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable(NAME);
        return campaignService.getCampaign(name)
                .flatMap(campaign -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(campaign))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> createCampaign(final ServerRequest serverRequest) {
        final Mono<Campaign> campaignMono = serverRequest.bodyToMono(Campaign.class);
        return campaignMono
                .flatMap(campaignService::createCampaign)
                .flatMap(campaign -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(campaign))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> updateCampaign(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable(NAME);
        final Mono<Campaign> campaignMono = serverRequest.bodyToMono(Campaign.class);
        return campaignMono
                .flatMap(campaign -> campaignService.updateCampaign(name, campaign))
                .flatMap(campaign -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(campaign))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> getCurrentCampaign(final ServerRequest serverRequest) {
        return campaignService.getCurrentCampaign()
                .flatMap(campaign -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(campaign))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> setCurrentCampaign(final ServerRequest serverRequest) {
        return campaignService.setCurrentCampaign(serverRequest.pathVariable(NAME))
                .flatMap(campaign -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(campaign))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }
}
