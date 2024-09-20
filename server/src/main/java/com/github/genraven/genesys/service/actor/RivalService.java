package com.github.genraven.genesys.service.actor;

import com.github.genraven.genesys.domain.actor.Actor;
import com.github.genraven.genesys.domain.actor.npc.NonPlayerActor;
import com.github.genraven.genesys.domain.actor.npc.Rival;
import com.github.genraven.genesys.domain.actor.npc.SingleNonPlayerActor;
import com.github.genraven.genesys.repository.actor.RivalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class RivalService {

    private final RivalRepository rivalRepository;

    @Autowired
    public RivalService(final RivalRepository rivalRepository) {
        this.rivalRepository = rivalRepository;
    }

    public Flux<Rival> getAllRivals() {
        return rivalRepository.findAll();
    }

    public Mono<Rival> getRival(final String name) {
        return rivalRepository.findById(name);
    }

    public Mono<Rival> createRival(final String name) {
        return rivalRepository.save(new Rival(new SingleNonPlayerActor(new NonPlayerActor(new Actor(name)))));
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
            riv.setSettings(rival.getSettings());
            riv.setWeapons(rival.getWeapons());
            riv.setArmors(rival.getArmors());
            return riv;
        }).flatMap(rivalRepository::save);
    }
}
