package com.github.genraven.genesys.repository;

import com.github.genraven.genesys.model.actor.talent.Talent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TalentRepository extends JpaRepository<Talent, Long> {
}
