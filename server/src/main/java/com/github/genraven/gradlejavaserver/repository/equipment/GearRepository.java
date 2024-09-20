package com.github.genraven.gradlejavaserver.repository.equipment;

import com.github.genraven.gradlejavaserver.domain.equipment.Gear;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GearRepository extends ReactiveMongoRepository<Gear, String> {
}
