package com.github.genraven.gradlejavaserver.service;

import com.github.genraven.gradlejavaserver.domain.campaign.Campaign;
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
            return camp;
        }).flatMap(campaignRepository::save);
    }

    public Mono<Campaign> createSession(final String campaignName, final String sessionName) {
        return getCampaign(campaignName).map(campaign -> {
            final Session session = new Session(sessionName);
            final List<Session> sessions = campaign.getSessions();
            sessions.add(session);
            campaign.setSessions(sessions);
            return campaign;
        }).flatMap(campaignRepository::save);
    }
}
