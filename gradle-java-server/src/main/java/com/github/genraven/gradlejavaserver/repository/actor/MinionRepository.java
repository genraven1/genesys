package com.github.genraven.gradlejavaserver.repository.actor;

import com.github.genraven.gradlejavaserver.domain.actor.npc.Minion;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MinionRepository extends ReactiveMongoRepository<Minion, String> {
}
