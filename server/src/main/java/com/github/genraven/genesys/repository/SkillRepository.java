package com.github.genraven.genesys.repository;

import com.github.genraven.genesys.domain.skill.Skill;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillRepository extends ReactiveMongoRepository<Skill, String> {
}
