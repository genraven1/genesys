package com.github.genraven.genesys.repository.lore;

import com.github.genraven.genesys.domain.lore.Lore;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoreRepository extends ReactiveMongoRepository<Lore, String> {
}
