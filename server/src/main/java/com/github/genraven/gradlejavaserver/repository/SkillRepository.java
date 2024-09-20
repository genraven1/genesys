package com.github.genraven.gradlejavaserver.repository;

import com.github.genraven.gradlejavaserver.domain.skill.Skill;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillRepository extends ReactiveMongoRepository<Skill, String> {
}
