package com.github.genraven.gradlejavaserver.repository;

import com.github.genraven.gradlejavaserver.domain.lore.Lore;
import com.github.genraven.gradlejavaserver.domain.lore.Organization;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface LoreRepository extends ReactiveMongoRepository<Lore, String> {
    Flux<Organization> findAllOrganizations();
}
