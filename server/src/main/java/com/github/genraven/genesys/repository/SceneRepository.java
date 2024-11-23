package com.github.genraven.genesys.repository;

import com.github.genraven.genesys.domain.campaign.Scene;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SceneRepository extends ReactiveMongoRepository<Scene, String> {
}
