package com.github.genraven.gradlejavaserver.service;

import com.github.genraven.gradlejavaserver.domain.campaign.Campaign;
import com.github.genraven.gradlejavaserver.domain.campaign.Scene;
import com.github.genraven.gradlejavaserver.domain.campaign.Session;
import com.github.genraven.gradlejavaserver.repository.CampaignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
public class CampaignService {

    private final CampaignRepository campaignRepository;

    @Autowired
    public CampaignService(final CampaignRepository campaignRepository) {
        this.campaignRepository = campaignRepository;
    }

    public Flux<Campaign> getAllCampaigns() {
        return campaignRepository.findAll();
    }

    public Mono<Campaign> getCampaign(final String name) {
        return campaignRepository.findById(name);
    }

    public Mono<Campaign> createCampaign(final String name) {
        return campaignRepository.save(new Campaign(name));
    }

    public Mono<Campaign> updateCampaign(final String name, final Campaign campaign) {
        return getCampaign(name).map(camp -> {
            camp.setName(campaign.getName());
            camp.setParty(campaign.getParty());
            camp.setSessions(campaign.getSessions());
            camp.setTalents(campaign.getTalents());
            return camp;
        }).flatMap(campaignRepository::save);
    }

    public Mono<Session> createSession(final String campaignName, final String sessionName) {
        getCampaign(campaignName).map(campaign -> {
            final Session session = new Session(sessionName);
            final List<Session> sessions = campaign.getSessions();
            sessions.add(session);
            campaign.setSessions(sessions);
            return campaign;
        }).flatMap(campaignRepository::save);
        return getSession(campaignName, sessionName);
    }

    public Mono<Session> getSession(final String campaignName, final String sessionName) {
        return getCampaign(campaignName)
                .map(campaign -> campaign.getSessions().stream()
                        .filter(session -> session.getName().equals(sessionName))
                        .findFirst().orElseThrow(ArrayIndexOutOfBoundsException::new));
    }

    public Mono<Session> updateSession(final String campaignName, final String sessionName, final Session session) {
        getCampaign(campaignName).map(campaign -> {
            campaign.getSessions().stream()
                    .filter(ses -> ses.getName().equals(sessionName)).forEach(ses -> {
                ses.setScenes(session.getScenes());
                ses.setParty(session.getParty());
            });
            return campaign;
        }).flatMap(campaignRepository::save);
        return getSession(campaignName, sessionName);
    }

    public Mono<Scene> createScene(final String campaignName, final String sessionName, final String sceneName) {
        getCampaign(campaignName).map(campaign -> {
            campaign.getSessions().stream().filter(session -> session.getName().equals(sessionName)).forEach(session -> {
                final Scene scene = new Scene(sceneName);
                final List<Scene> scenes = session.getScenes();
                scenes.add(scene);
                session.setScenes(scenes);
            });
            return campaign;
        }).flatMap(campaignRepository::save);
        return getScene(campaignName, sessionName, sceneName);
    }

    public Mono<Scene> getScene(final String campaignName, final String sessionName, final String sceneName) {
        return getCampaign(campaignName)
                .map(campaign -> campaign.getSessions().stream()
                        .filter(session -> session.getName().equals(sessionName))
                        .map(session -> session.getScenes().stream()
                                .filter(scene -> scene.getName().equals(sceneName))
                                .findFirst().orElseThrow(ArrayIndexOutOfBoundsException::new))
                        .findFirst().orElseThrow(ArrayIndexOutOfBoundsException::new));
    }
}
