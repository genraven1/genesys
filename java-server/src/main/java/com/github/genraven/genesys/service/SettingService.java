package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.Setting;
import com.github.genraven.genesys.repository.SettingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class SettingService {
    @Autowired
    private SettingRepository settingRepository;

    public Mono<Setting> getCurrentSetting(){
        return settingRepository
    }

    public Mono<Setting> getSettingById(final Long id) {
        return settingRepository.findById(id);
    }

    public Mono<Setting> createSetting(final String name) {
        return settingRepository.save(new Setting(name));
    }
}
