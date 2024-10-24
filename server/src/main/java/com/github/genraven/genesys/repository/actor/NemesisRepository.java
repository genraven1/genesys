package com.github.genraven.genesys.repository.actor;

import com.github.genraven.genesys.domain.actor.npc.Nemesis;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NemesisRepository extends ReactiveMongoRepository<Nemesis, String> {
}
