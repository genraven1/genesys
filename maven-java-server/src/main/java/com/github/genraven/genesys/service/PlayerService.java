package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class PlayerService {

    @Autowired
    public PlayerService(final PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    private final PlayerRepository playerRepository;

    public Flux<Player> getAllPlayers() {
        return playerRepository.findAll();
    }
}
