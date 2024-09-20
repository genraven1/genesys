package com.github.genraven.genesys.repository;

import com.github.genraven.genesys.domain.Setting;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface SettingRepository extends ReactiveMongoRepository<Setting, String> {
    Mono<Setting> findByCurrent(boolean current);
}
