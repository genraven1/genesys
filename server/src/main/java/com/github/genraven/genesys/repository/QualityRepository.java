package com.github.genraven.genesys.repository;

import com.github.genraven.genesys.domain.equipment.Quality;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface QualityRepository extends ReactiveMongoRepository<Quality, String> {
}
