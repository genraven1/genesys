package com.github.genraven.genesys.service.actor;

import com.github.genraven.genesys.domain.actor.Actor;
import com.github.genraven.genesys.domain.actor.player.Archetype;
import com.github.genraven.genesys.domain.actor.player.Career;
import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.domain.actor.player.PlayerSkill;
import com.github.genraven.genesys.domain.actor.Characteristic;
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
        return playerRepository.findAll().map(player -> {
            player.getTotalSoak();
            player.getTotalEncumbrance();
            player.getTotalMeleeDefense();
            player.getTotalRangedDefense();
            return player;
        });
    }


    public Mono<Player> getPlayer(final String id) {
        return playerRepository.findById(id).map(player -> {
            player.getTotalSoak();
            player.getTotalEncumbrance();
            player.getTotalMeleeDefense();
            player.getTotalRangedDefense();
            return player;
        });
    }

    public Mono<Player> createPlayer(final String name) {
        return skillService.getSkillsForCurrentCampaign().flatMap(skills -> {
            final Player player = new Player(new Actor(name));
            player.setSkills(skills.stream().map(PlayerSkill::new).collect(Collectors.toList()));
            return playerRepository.save(player);
        });
    }

    public Mono<Player> updatePlayer(final String name, final Player player) {
        return getPlayer(name).map(existingPlayer -> {
            existingPlayer.setSkills(player.getSkills());
            existingPlayer.setTalents(player.getTalents());
            existingPlayer.setWeapons(player.getWeapons());
            existingPlayer.setArmors(player.getArmors());
            return existingPlayer;
        }).flatMap(playerRepository::save);
    }

    public Mono<Player> updatePlayerCareer(final String id, final Career career) {
        return getPlayer(id).flatMap(existingPlayer -> {
            existingPlayer.setCareer(career);
            existingPlayer.getSkills().forEach(playerSkill -> career.getSkills().forEach(skill -> {
                playerSkill.setCareer(playerSkill.getId().equals(skill.getId()));
                playerSkill.setRanks(0);
            }));
            return playerRepository.save(existingPlayer);
        });
    }

    public Mono<Player> updatePlayerCareerSkills(final String id, final List<PlayerSkill> skills) {
        final List<String> ids = skills.stream().map(PlayerSkill::getId).toList();
        return getPlayer(id).flatMap(existingPlayer -> {
            getCareerSkills(existingPlayer).forEach(playerSkill -> playerSkill.setRanks(ids.contains(playerSkill.getId()) ? 1 : 0));
            return playerRepository.save(existingPlayer);
        });
    }

    private List<PlayerSkill> getCareerSkills(final Player player) {
        return player.getSkills().stream().filter(PlayerSkill::isCareer).toList();
    }

    public Mono<Player> updatePlayerArchetype(final String id, final Archetype archetype) {
        return getPlayer(id).flatMap(existingPlayer -> {
            existingPlayer.setArchetype(archetype);
            existingPlayer.setBrawn(new Characteristic(Characteristic.Type.BRAWN, archetype.getBrawn()));
            existingPlayer.setAgility(new Characteristic(Characteristic.Type.AGILITY, archetype.getAgility()));
            existingPlayer.setIntellect(new Characteristic(Characteristic.Type.INTELLECT, archetype.getIntellect()));
            existingPlayer.setCunning(new Characteristic(Characteristic.Type.CUNNING, archetype.getCunning()));
            existingPlayer.setWillpower(new Characteristic(Characteristic.Type.WILLPOWER, archetype.getWillpower()));
            existingPlayer.setPresence(new Characteristic(Characteristic.Type.PRESENCE, archetype.getPresence()));
            existingPlayer.setWounds(archetype.getWounds());
            existingPlayer.setStrain(archetype.getStrain());
            existingPlayer.updateAvailableExperience(archetype.getExperience());
            return playerRepository.save(existingPlayer);
        });
    }

    public Mono<Player> updatePlayerCharacteristic(final String id, final Characteristic characteristic) {
        return getPlayer(id).flatMap(player -> {
            switch (characteristic.getType()) {
                case BRAWN -> player.setBrawn(characteristic);
                case AGILITY -> player.setAgility(characteristic);
                case INTELLECT -> player.setIntellect(characteristic);
                case CUNNING -> player.setCunning(characteristic);
                case WILLPOWER -> player.setWillpower(characteristic);
                case PRESENCE -> player.setPresence(characteristic);
            }
            return playerRepository.save(player);
        });
    }
}
