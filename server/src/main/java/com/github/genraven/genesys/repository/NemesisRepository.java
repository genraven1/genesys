package com.github.genraven.genesys.repository;

import com.github.genraven.genesys.model.actor.Nemesis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NemesisRepository extends JpaRepository<Nemesis, Long> {
}
