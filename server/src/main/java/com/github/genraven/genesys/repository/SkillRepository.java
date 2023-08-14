package com.github.genraven.genesys.repository;

import com.github.genraven.genesys.model.actor.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
}
