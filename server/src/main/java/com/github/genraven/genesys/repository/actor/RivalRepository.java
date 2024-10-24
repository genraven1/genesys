package com.github.genraven.genesys.repository.actor;

import com.github.genraven.genesys.domain.actor.npc.Rival;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RivalRepository extends ReactiveMongoRepository<Rival, String> {
}
