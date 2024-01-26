package com.github.genraven.gradlejavaserver.service;

import com.github.genraven.gradlejavaserver.domain.Setting;
import com.github.genraven.gradlejavaserver.repository.SettingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class SettingService {
    @Autowired
    private SettingRepository settingRepository;

    public Mono<Setting> getCurrentSetting(){
        return settingRepository.findByCurrent(true);
    }

    public Flux<Setting> getAllSettings() {
        return settingRepository.findAll();
    }

    public Mono<Setting> getSettingById(final Long id) {
        return settingRepository.findById(id);
    }

    public Mono<Setting> createSetting(final String name) {
        return settingRepository.save(new Setting(name));
    }
}
