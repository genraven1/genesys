package com.github.genraven.genesys.repository;

import com.github.genraven.genesys.domain.actor.player.Career;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CareerRepository extends ReactiveMongoRepository<Career, String> {
}
