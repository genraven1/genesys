package com.github.genraven.genesys.repository.actor;

import com.github.genraven.genesys.domain.actor.npc.Minion;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MinionRepository extends ReactiveMongoRepository<Minion, String> {
}
