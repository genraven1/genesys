package com.github.genraven.genesys.service.actor;

import com.github.genraven.genesys.domain.actor.Actor;
import com.github.genraven.genesys.domain.actor.player.Archetype;
import com.github.genraven.genesys.domain.actor.player.Career;
import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.domain.actor.player.PlayerSkill;
import com.github.genraven.genesys.domain.skill.Skill;
import com.github.genraven.genesys.repository.actor.PlayerRepository;
import com.github.genraven.genesys.service.SkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlayerService {

    private final PlayerRepository playerRepository;
    private final SkillService skillService;

    public Flux<Player> getAllPlayers() {
        return playerRepository.findAll()
                .map(player -> {
                    player.getTotalSoak();
                    player.getTotalEncumbrance();
                    return player;
                });
    }


    public Mono<Player> getPlayer(final String id) {
        return playerRepository.findById(id)
                .map(player -> {
                    player.getTotalSoak();
                    player.getTotalEncumbrance();
                    return player;
                });
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
        return playerRepository.findById(name).map(existingPlayer -> {
            existingPlayer.setExperience(player.getExperience());
            existingPlayer.setSkills(player.getSkills());
            existingPlayer.setTalents(player.getTalents());
            existingPlayer.setWeapons(player.getWeapons());
            existingPlayer.setArmors(player.getArmors());
            return existingPlayer;
        }).flatMap(playerRepository::save);
    }

    public Mono<Player> updatePlayerCareer(final String id, final Career career) {
        return playerRepository.findById(id)
                .flatMap(existingPlayer -> {
                    existingPlayer.setCareer(career);
                    existingPlayer.getSkills().forEach(playerSkill -> career.getSkills().stream()
                            .filter(skill -> playerSkill.getId().equals(skill.getId()))
                            .forEach(skill -> playerSkill.setCareer(true)));
                    return playerRepository.save(existingPlayer);
                });
    }

    public Mono<Player> updatePlayerCareerSkills(final String id, final List<Skill> skills) {
        return playerRepository.findById(id)
                .flatMap(existingPlayer -> {
                    existingPlayer.getSkills().forEach(playerSkill -> skills.stream()
                            .filter(skill -> playerSkill.isCareer()).forEach(skill -> {
                        if (playerSkill.getId().equals(skill.getId())) {
                            playerSkill.setRanks(playerSkill.getRanks() + 1);
                        } else {
                            switch (playerSkill.getRanks()) {
                                case 1:
                                    if (existingPlayer.getArchetype().getSkill() != null && !existingPlayer.getArchetype().getSkill().getId().equals(skill.getId())) {
                                        playerSkill.setRanks(0);
                                    }
                                    break;
                                case 0:
                                    playerSkill.setRanks(0);
                                    break;
                                default:
                                    playerSkill.setRanks(playerSkill.getRanks() - 1);
                            }
                        }
                    }));
                    return playerRepository.save(existingPlayer);
                });
    }

    public Mono<Player> updatePlayerArchetype(final String id, final Archetype archetype) {
        return playerRepository.findById(id)
                .flatMap(existingPlayer -> {
                    existingPlayer.setArchetype(archetype);
                    existingPlayer.setBrawn(archetype.getBrawn());
                    existingPlayer.setAgility(archetype.getAgility());
                    existingPlayer.setIntellect(archetype.getIntellect());
                    existingPlayer.setCunning(archetype.getCunning());
                    existingPlayer.setWillpower(archetype.getWillpower());
                    existingPlayer.setPresence(archetype.getPresence());
                    existingPlayer.setWounds(archetype.getWounds());
                    existingPlayer.setStrain(archetype.getStrain());
                    existingPlayer.updateAvailableExperience(archetype.getExperience());
                    return playerRepository.save(existingPlayer);
                });
    }
}
