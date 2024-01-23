package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.actor.Actor;
import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

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

    public Mono<Player> getPlayer(final Long id) {
        return playerRepository.findById(id);
    }

    public Mono<Player> createPlayer(final String name) {
        return playerRepository.save(new Player(name));
    }

    public Mono<Player> updatePlayer(final Long id, final Player player) {
        return playerRepository.findById(id).map(play -> {
            play.setName(player.getName());
            play.setBrawn(player.getBrawn());
            play.setAgility(player.getAgility());
            play.setIntellect(player.getIntellect());
            play.setCunning(player.getCunning());
            play.setWillpower(player.getWillpower());
            play.setPresence(player.getPresence());
            play.setWounds(player.getWounds());
            play.setStrain(player.getStrain());
            play.setMelee(player.getMelee());
            play.setRanged(player.getRanged());
            play.setSkills(player.getSkills());
            return play;
        });
    }
}
