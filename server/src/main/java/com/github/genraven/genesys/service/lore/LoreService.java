package com.github.genraven.genesys.service.lore;

import com.github.genraven.genesys.domain.lore.Lore;
import com.github.genraven.genesys.domain.lore.Organization;
import com.github.genraven.genesys.repository.lore.LoreRepository;
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
}
