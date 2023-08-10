package com.github.genraven.genesys.service;

import com.github.genraven.genesys.model.actor.Skill;
import com.github.genraven.genesys.repository.SkillRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillService(final SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public Skill createSkill(final String name) {
        return skillRepository.save(new Skill(name));
    }

    public Skill updateSkill(final Long id, final Skill skill) {
        final Skill oldSkill = getSkill(id);

        return skillRepository.save(oldSkill);
    }

    public Skill getSkill(final Long id) {
        return skillRepository.findById(id).orElse(new Skill(""));
    }

    public List<Skill> getSkills() {
        return skillRepository.findAll();
    }
}
