package com.github.genraven.genesys.service.actor;

import com.github.genraven.genesys.domain.actor.Actor;
import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.domain.actor.player.PlayerSkill;
import com.github.genraven.genesys.repository.actor.PlayerRepository;
import com.github.genraven.genesys.service.SkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlayerService {

    private final PlayerRepository playerRepository;
    private final SkillService skillService;

    public Flux<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    public Mono<Player> getPlayer(final String name) {
        return playerRepository.findById(name);
    }

    public Mono<Player> createPlayer(final String name) {
        return skillService.getSkillsForCurrentCampaign()
                .flatMap(skills -> {
                    final Player player = new Player(new Actor(name));
                    player.setSkills(skills.stream().map(PlayerSkill::new).collect(Collectors.toList()));
                    return playerRepository.save(player);
                });
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
            play.setEncumbrance(player.getEncumbrance());
            play.setExperience(player.getExperience());
            play.setCareer(player.getCareer());
            play.setArchetype(player.getArchetype());
            play.setSkills(player.getSkills());
            play.setTalents(player.getTalents());
            play.setWeapons(player.getWeapons());
            play.setArmors(player.getArmors());
            return play;
        }).flatMap(playerRepository::save);
    }
}
