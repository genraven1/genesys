package com.github.genraven.gradlejavaserver.service.actor;

import com.github.genraven.gradlejavaserver.domain.actor.Actor;
import com.github.genraven.gradlejavaserver.domain.actor.npc.Minion;
import com.github.genraven.gradlejavaserver.domain.actor.npc.NonPlayerActor;
import com.github.genraven.gradlejavaserver.repository.actor.MinionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class MinionService {

    private final MinionRepository minionRepository;

    @Autowired
    public MinionService(final MinionRepository minionRepository) {
        this.minionRepository = minionRepository;
    }

    public Flux<Minion> getAllMinions() {
        return minionRepository.findAll();
    }

    public Mono<Minion> getMinion(final String name) {
        return minionRepository.findById(name);
    }

    public Mono<Minion> createMinion(final String name) {
        return minionRepository.save(new Minion(new NonPlayerActor(new Actor(name))));
    }

    public Mono<Minion> updateMinion(final String name, final Minion minion) {
        return minionRepository.findById(name).map(min -> {
            min.setBrawn(minion.getBrawn());
            min.setAgility(minion.getAgility());
            min.setIntellect(minion.getIntellect());
            min.setCunning(minion.getCunning());
            min.setWillpower(minion.getWillpower());
            min.setPresence(minion.getPresence());
            min.setWounds(minion.getWounds());
            min.setCombat(minion.getCombat());
            min.setSocial(minion.getSocial());
            min.setGeneral(minion.getGeneral());
            min.setAbilities(minion.getAbilities());
            min.setSkills(minion.getSkills());
            min.setTalents(minion.getTalents());
            min.setSettings(minion.getSettings());
            min.setWeapons(minion.getWeapons());
            return min;
        }).flatMap(minionRepository::save);
    }
}
