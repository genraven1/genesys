package com.github.genraven.genesys.service.actor;

import com.github.genraven.genesys.domain.actor.Actor;
import com.github.genraven.genesys.domain.actor.ActorSkill;
import com.github.genraven.genesys.domain.actor.npc.NonPlayerActor;
import com.github.genraven.genesys.domain.actor.npc.Rival;
import com.github.genraven.genesys.domain.actor.npc.SingleNonPlayerActor;

import com.github.genraven.genesys.repository.actor.RivalRepository;
import com.github.genraven.genesys.service.SkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RivalService {

    private final RivalRepository rivalRepository;
    private final SkillService skillService;

    public Flux<Rival> getAllRivals() {
        return rivalRepository.findAll().map(rival -> {
            rival.getTotalSoak();
            rival.getTotalMeleeDefense();
            rival.getTotalRangedDefense();
            return rival;
        });
    }

    public Mono<Rival> getRival(final String name) {
        return rivalRepository.findById(name).map(rival -> {
            rival.getTotalSoak();
            rival.getTotalMeleeDefense();
            rival.getTotalRangedDefense();
            return rival;
        });
    }

    public Mono<Rival> createRival(final String rivalName) {
        return skillService.getSkillsForCurrentCampaign()
                .flatMap(skills -> {
                    final Rival rival = new Rival(new SingleNonPlayerActor(new NonPlayerActor(new Actor(rivalName))));
                    rival.setSkills(skills.stream().map(ActorSkill::new).toList());
                    return rivalRepository.save(rival);
                });
    }

    public Mono<Rival> updateRival(final String name, final Rival rival) {
        return rivalRepository.findById(name).map(riv -> {
            riv.setBrawn(rival.getBrawn());
            riv.setAgility(rival.getAgility());
            riv.setIntellect(rival.getIntellect());
            riv.setCunning(rival.getCunning());
            riv.setWillpower(rival.getWillpower());
            riv.setPresence(rival.getPresence());
            riv.setWounds(rival.getWounds());
            riv.setCombat(rival.getCombat());
            riv.setSocial(rival.getSocial());
            riv.setGeneral(rival.getGeneral());
            riv.setAbilities(rival.getAbilities());
            riv.setSkills(rival.getSkills());
            riv.setTalents(rival.getTalents());
            riv.setWeapons(rival.getWeapons());
            riv.setArmors(rival.getArmors());
            return riv;
        }).flatMap(rivalRepository::save);
    }
}
