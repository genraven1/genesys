package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.Talent;
import com.github.genraven.genesys.repository.TalentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class TalentService {

    private final TalentRepository talentRepository;

    @Autowired
    public TalentService(final TalentRepository talentRepository) {
        this.talentRepository = talentRepository;
    }

    public Flux<Talent> getAllTalents() {
        return talentRepository.findAll();
    }

    public Mono<Talent> getTalent(final String name) {
        return talentRepository.findById(name);
    }

    public Mono<Talent> createTalent(final Talent talent) {
        return talentRepository.save(talent);
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
}
