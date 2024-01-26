package com.github.genraven.gradlejavaserver.repository;

import com.github.genraven.gradlejavaserver.domain.Setting;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface SettingRepository extends ReactiveMongoRepository<Setting, Long> {
    Mono<Setting> findByCurrent(boolean current);
}
