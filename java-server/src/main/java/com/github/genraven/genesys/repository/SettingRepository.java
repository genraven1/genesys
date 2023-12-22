package com.github.genraven.genesys.repository;

import com.github.genraven.genesys.domain.Setting;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SettingRepository extends ReactiveMongoRepository<Setting, Long> {
}
