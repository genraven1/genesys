package com.github.genraven.gradlejavaserver.service.campaign;

import com.github.genraven.gradlejavaserver.domain.campaign.Party;
import com.github.genraven.gradlejavaserver.repository.campaign.PartyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class PartyService {
    private final PartyRepository partyRepository;

    @Autowired
    public PartyService(final PartyRepository partyRepository) {
        this.partyRepository = partyRepository;
    }

    public Mono<Party> getParty(final String name) {
        return partyRepository.findById(name);
    }

    public Mono<Party> createParty(final String name) {
        return partyRepository.save(new Party(name));
    }

    public Mono<Party> updateParty(final String name, final Party party) {
        return getParty(name).map(par -> {
            par.setName(party.getName());
            return par;
        }).flatMap(partyRepository::save);
    }
}
