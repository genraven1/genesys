package com.github.genraven.gradlejavaserver.repository.equipment;

import com.github.genraven.gradlejavaserver.domain.equipment.Armor;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArmorRepository extends ReactiveMongoRepository<Armor, String> {
}
