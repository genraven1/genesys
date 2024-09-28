package com.github.genraven.genesys.handler;

import com.github.genraven.genesys.domain.Talent;
import com.github.genraven.genesys.domain.campaign.Campaign;
import com.github.genraven.genesys.domain.campaign.Session;
import com.github.genraven.genesys.domain.skill.Skill;
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

    public Mono<ServerResponse> addSkillToCampaign(final ServerRequest request) {
        final String name = request.pathVariable(NAME);
        return request.bodyToMono(Skill.class)
                .flatMap(skill -> campaignService.addSkillToCampaign(name, skill.getName()))
                .flatMap(updatedCampaign -> ServerResponse.ok().bodyValue(updatedCampaign))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    public Mono<ServerResponse> getSkillsByCampaign(ServerRequest request) {
        final String name = request.pathVariable(NAME);
        return campaignService.getSkillsByCampaignId(name)
                .flatMap(skills -> ServerResponse.ok().bodyValue(skills))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    public Mono<ServerResponse> createSession(final ServerRequest serverRequest) {
        final String campaignName = serverRequest.pathVariable("campaignName");
        final String sessionName = serverRequest.pathVariable("sessionName");
        return campaignService.createSession(campaignName, sessionName)
                .flatMap(campaign -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(campaign))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> getSession(final ServerRequest serverRequest) {
        final String campaignName = serverRequest.pathVariable("campaignName");
        final String sessionName = serverRequest.pathVariable("sessionName");
        return campaignService.getSession(campaignName, sessionName)
                .flatMap(session -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(session))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> updateSession(final ServerRequest serverRequest) {
        final String campaignName = serverRequest.pathVariable("campaignName");
        final String sessionName = serverRequest.pathVariable("sessionName");
        final Mono<Session> sessionMono = serverRequest.bodyToMono(Session.class);
        return sessionMono
                .flatMap(session -> campaignService.updateSession(campaignName, sessionName, session))
                .flatMap(session -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(session))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> createScene(final ServerRequest serverRequest) {
        final String campaignName = serverRequest.pathVariable("campaignName");
        final String sessionName = serverRequest.pathVariable("sessionName");
        final String sceneName = serverRequest.pathVariable("sceneName");
        return campaignService.createScene(campaignName, sessionName, sceneName)
                .flatMap(campaign -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(campaign))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> getScene(final ServerRequest serverRequest) {
        final String campaignName = serverRequest.pathVariable("campaignName");
        final String sessionName = serverRequest.pathVariable("sessionName");
        final String sceneName = serverRequest.pathVariable("sceneName");
        return campaignService.getScene(campaignName, sessionName, sceneName)
                .flatMap(session -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(session))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }
}
