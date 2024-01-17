package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.Talent;
import com.github.genraven.genesys.repository.TalentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class TalentService {

    @Autowired
    private TalentRepository talentRepository;

    public Mono<Talent> getTalentById(final Long id) {
        return talentRepository.findById(id);
    }

    public Mono<Talent> createTalent(final String name) {
        return talentRepository.save(new Talent(name));
    }
}
