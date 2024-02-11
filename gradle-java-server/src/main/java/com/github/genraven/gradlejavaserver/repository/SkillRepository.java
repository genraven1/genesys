package com.github.genraven.gradlejavaserver.repository;

import com.github.genraven.gradlejavaserver.domain.skill.Skill;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface SkillRepository extends ReactiveMongoRepository<Skill, String> {
}
