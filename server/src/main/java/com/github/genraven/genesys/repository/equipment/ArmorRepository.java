package com.github.genraven.genesys.repository.equipment;

import com.github.genraven.genesys.domain.equipment.Armor;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArmorRepository extends ReactiveMongoRepository<Armor, String> {
}
