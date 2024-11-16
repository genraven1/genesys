package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.campaign.Campaign;
import com.github.genraven.genesys.repository.CampaignRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class CampaignService {

    private final CampaignRepository campaignRepository;

    public Flux<Campaign> getAllCampaigns() {
        return campaignRepository.findAll();
    }

    public Mono<Campaign> getCampaign(final String name) {
        return campaignRepository.findById(name);
    }

    public Mono<Campaign> createCampaign(final Campaign campaign) {
        return campaignRepository.save(campaign);
    }

    public Mono<Campaign> updateCampaign(final String name, final Campaign campaign) {
        return getCampaign(name).map(camp -> {
            camp.setName(campaign.getName());
            camp.setParty(campaign.getParty());
            camp.setSessions(campaign.getSessions());
            camp.setActive(campaign.isActive());
            return camp;
        }).flatMap(campaignRepository::save);
    }

    public Mono<Campaign> getCurrentCampaign() {
        return campaignRepository.findByCurrent(true);
    }

    public Mono<Campaign> setCurrentCampaign(final String name) {
        return getCampaign(name).map(campaign -> {
            campaign.setCurrent(true);
            return campaign;
        }).flatMap(campaignRepository::save);
    }
}
