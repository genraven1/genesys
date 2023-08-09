package com.github.genraven.genesys.repository;

import com.github.genraven.genesys.model.Setting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SettingRepository extends JpaRepository<Setting, Long> {
    Setting findByName(String name);
}