package com.github.genraven.gradlejavaserver.service.actor;

import com.github.genraven.gradlejavaserver.domain.actor.Actor;
import com.github.genraven.gradlejavaserver.domain.actor.player.Player;
import com.github.genraven.gradlejavaserver.repository.actor.PlayerRepository;
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

    public Mono<Player> getPlayer(final String name) {
        return playerRepository.findById(name);
    }

    public Mono<Player> createPlayer(final String name) {
        return playerRepository.save(new Player(new Actor(name)));
    }

    public Mono<Player> updatePlayer(final String name, final Player player) {
        return playerRepository.findById(name).map(play -> {
            play.setBrawn(player.getBrawn());
            play.setAgility(player.getAgility());
            play.setIntellect(player.getIntellect());
            play.setCunning(player.getCunning());
            play.setWillpower(player.getWillpower());
            play.setPresence(player.getPresence());
            play.setWounds(player.getWounds());
            play.setStrain(player.getStrain());
            play.setSkills(player.getSkills());
            play.setSettings(player.getSettings());
            play.setWeapons(player.getWeapons());
            play.setArmors(player.getArmors());
            return play;
        }).flatMap(playerRepository::save);
    }
}
