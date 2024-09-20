package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.skill.Skill;
import com.github.genraven.genesys.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class SkillService {
    
    private final SkillRepository skillRepository;
    
    @Autowired
    public SkillService(final SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public Flux<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    public Mono<Skill> getSkill(final String name) {
        return skillRepository.findById(name);
    }

    public Mono<Skill> createSkill(final String name) {
        return skillRepository.save(new Skill(name));
    }

    public Mono<Skill> updateSkill(final String name, final Skill skill) {
        return getSkill(name).map(sk -> {
            sk.setCharacteristic(skill.getCharacteristic());
            sk.setType(skill.getType());
            return sk;
        }).flatMap(skillRepository::save);
    }
}
