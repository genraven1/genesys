package com.github.genraven.javaserver.repository;

import com.github.genraven.javaserver.domain.Setting;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SettingRepository extends MongoRepository<Setting, Long> {
    Setting findByCurrent(final boolean current);
}
