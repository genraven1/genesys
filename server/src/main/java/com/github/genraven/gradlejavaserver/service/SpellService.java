package com.github.genraven.gradlejavaserver.service;

import com.github.genraven.gradlejavaserver.domain.spell.Spell;
import com.github.genraven.gradlejavaserver.repository.SpellRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class SpellService {
    private final SpellRepository spellRepository;

    @Autowired
    public SpellService(final SpellRepository spellRepository) {
        this.spellRepository = spellRepository;
    }

    public Flux<Spell> getAllSpells() {
        return spellRepository.findAll();
    }

    public Mono<Spell> getSpell(final String name) {
        return spellRepository.findById(name);
    }

    public Mono<Spell> createSpell(final String name) {
        return spellRepository.save(new Spell(name));
    }

    public Mono<Spell> updateSpell(final String name, final Spell spell) {
        return getSpell(name).map(sp -> {
            sp.setDescription(spell.getDescription());
            sp.setConcentration(spell.isConcentration());
            sp.setDifficulty(spell.getDifficulty());
            sp.setSkills(spell.getSkills());
            sp.setEffects(spell.getEffects());
            return sp;
        }).flatMap(spellRepository::save);
    }
}
