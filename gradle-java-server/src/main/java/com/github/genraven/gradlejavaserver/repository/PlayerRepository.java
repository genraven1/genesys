package com.github.genraven.gradlejavaserver.repository;

import com.github.genraven.gradlejavaserver.domain.actor.player.Player;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends ReactiveMongoRepository<Player, Long> {
}
