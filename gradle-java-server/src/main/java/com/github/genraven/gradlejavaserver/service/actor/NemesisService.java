package com.github.genraven.gradlejavaserver.service.actor;

import com.github.genraven.gradlejavaserver.domain.actor.Actor;
import com.github.genraven.gradlejavaserver.domain.actor.npc.Nemesis;
import com.github.genraven.gradlejavaserver.domain.actor.npc.NonPlayerActor;
import com.github.genraven.gradlejavaserver.domain.actor.npc.SingleNonPlayerActor;
import com.github.genraven.gradlejavaserver.repository.actor.NemesisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class NemesisService {

    private final NemesisRepository nemesisRepository;

    @Autowired
    public NemesisService(final NemesisRepository nemesisRepository) {
        this.nemesisRepository = nemesisRepository;
    }

    public Flux<Nemesis> getAllNemeses() {
        return nemesisRepository.findAll();
    }

    public Mono<Nemesis> getNemesis(final String name) {
        return nemesisRepository.findById(name);
    }

    public Mono<Nemesis> createNemesis(final String name) {
        return nemesisRepository.save(new Nemesis(new SingleNonPlayerActor(new NonPlayerActor(new Actor(name)))));
    }

    public Mono<Nemesis> updateNemesis(final String name, final Nemesis nemesis) {
        return nemesisRepository.findById(name).map(nem -> {
            nem.setBrawn(nemesis.getBrawn());
            nem.setAgility(nemesis.getAgility());
            nem.setIntellect(nemesis.getIntellect());
            nem.setCunning(nemesis.getCunning());
            nem.setWillpower(nemesis.getWillpower());
            nem.setPresence(nemesis.getPresence());
            nem.setWounds(nemesis.getWounds());
            nem.setCombat(nemesis.getCombat());
            nem.setSocial(nemesis.getSocial());
            nem.setGeneral(nemesis.getGeneral());
            nem.setAbilities(nemesis.getAbilities());
            nem.setSkills(nemesis.getSkills());
            nem.setTalents(nemesis.getTalents());
            nem.setSettings(nemesis.getSettings());
            nem.setStrain(nemesis.getStrain());
            nem.setWeapons(nemesis.getWeapons());
            return nem;
        }).flatMap(nemesisRepository::save);
    }
}
