package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.Talent;
import com.github.genraven.genesys.domain.campaign.Campaign;
import com.github.genraven.genesys.repository.CampaignRepository;
import com.github.genraven.genesys.repository.TalentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
public class TalentService {

    private final TalentRepository talentRepository;
    private final CampaignRepository campaignRepository;

    @Autowired
    public TalentService(final TalentRepository talentRepository, final CampaignRepository campaignRepository) {
        this.talentRepository = talentRepository;
        this.campaignRepository = campaignRepository;
    }

    public Flux<Talent> getAllTalents() {
        return talentRepository.findAll();
    }

    public Mono<Talent> getTalent(final String name) {
        return talentRepository.findById(name);
    }

    public Mono<Talent> createTalent(final String name) {
        return talentRepository.save(new Talent(name));
    }

    public Mono<Talent> updateTalent(final String name, final Talent talent) {
        return getTalent(name).map(tal -> {
            tal.setActivation(talent.getActivation());
            tal.setRanked(talent.isRanked());
            tal.setTier(talent.getTier());
            tal.setDescription(talent.getDescription());
            tal.setSummary(talent.getSummary());
            tal.setModifiers(talent.getModifiers());
            return tal;
        }).flatMap(talentRepository::save);
    }

    public Mono<List<Talent>> getTalentsForCurrentCampaign() {
        return campaignRepository.findByCurrent(true)
                .flatMap(campaign -> Flux.fromIterable(campaign.getTalentIds())
                        .flatMap(talentRepository::findById)
                        .collectList());
    }

    public Mono<Campaign> addTalentToCurrentCampaign(final String talentId) {
        return campaignRepository.findByCurrent(true).flatMap(existingCampaign -> {
            existingCampaign.getTalentIds().add(talentId);
            return campaignRepository.save(existingCampaign);
        });
    }
}
