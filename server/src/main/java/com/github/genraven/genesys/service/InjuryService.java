package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.CriticalInjury;
import com.github.genraven.genesys.repository.InjuryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class InjuryService {

    private final InjuryRepository injuryRepository;

    @Autowired
    public InjuryService(final InjuryRepository injuryRepository) {
        this.injuryRepository = injuryRepository;
    }

    public Flux<CriticalInjury> getAllInjuries() {
        return injuryRepository.findAll();
    }

    public Mono<CriticalInjury> getInjury(final String name) {
        return injuryRepository.findById(name);
    }

    public Mono<CriticalInjury> createInjury(final CriticalInjury criticalInjury) {
        return injuryRepository.save(criticalInjury);
    }

    public Mono<CriticalInjury> updateInjury(final String name, final CriticalInjury criticalInjury) {
        return getInjury(name).map(injury -> {
            injury.setSeverity(criticalInjury.getSeverity());
            injury.setDescription(criticalInjury.getDescription());
            injury.setMin(criticalInjury.getMin());
            injury.setMax(criticalInjury.getMax());
            injury.setModifiers(criticalInjury.getModifiers());
            return injury;
        }).flatMap(injuryRepository::save);
    }
}
