package com.github.genraven.gradlejavaserver.service;

import com.github.genraven.gradlejavaserver.domain.lore.Lore;
import com.github.genraven.gradlejavaserver.domain.lore.Organization;
import com.github.genraven.gradlejavaserver.repository.LoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class LoreService {

    private final LoreRepository loreRepository;

    @Autowired
    public LoreService(final LoreRepository loreRepository) {
        this.loreRepository = loreRepository;
    }

    public Flux<Lore> getAllLore() {
        return loreRepository.findAll();
    }

    public Flux<Organization> getAllOrganizations() {
        return loreRepository.findAllOrganizations();
    }

    public Mono<Organization> createOrganization(final String name) {
        return loreRepository.saveOrganization(new Organization(new Lore(name)));
    }
}
