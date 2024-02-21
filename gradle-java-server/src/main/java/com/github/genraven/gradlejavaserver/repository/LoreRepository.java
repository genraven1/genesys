package com.github.genraven.gradlejavaserver.repository;

import com.github.genraven.gradlejavaserver.domain.lore.Lore;
import com.github.genraven.gradlejavaserver.domain.lore.Organization;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface LoreRepository extends ReactiveMongoRepository<Lore, String> {
    Flux<Organization> findAllOrganizations();

    Mono<Organization> saveOrganization(final Organization organization);
    Mono<Organization> getOrganization(final String name);
}
