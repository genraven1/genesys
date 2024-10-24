package com.github.genraven.genesys.repository;

import com.github.genraven.genesys.domain.actor.player.Archetype;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArchetypeRepository  extends ReactiveMongoRepository<Archetype, String> {
}
