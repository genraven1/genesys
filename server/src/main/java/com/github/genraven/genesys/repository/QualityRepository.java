package com.github.genraven.genesys.repository;

import com.github.genraven.genesys.model.actor.equipment.Quality;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QualityRepository extends JpaRepository<Quality, Long> {
}
