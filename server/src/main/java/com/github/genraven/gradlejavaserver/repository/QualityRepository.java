package com.github.genraven.gradlejavaserver.repository;

import com.github.genraven.gradlejavaserver.domain.equipment.Quality;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface QualityRepository extends ReactiveMongoRepository<Quality, String> {
}
