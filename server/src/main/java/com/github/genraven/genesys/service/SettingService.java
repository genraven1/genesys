package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.Setting;
import com.github.genraven.genesys.repository.SettingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class SettingService {

    private final SettingRepository settingRepository;

    @Autowired
    public SettingService(final SettingRepository settingRepository) {
        this.settingRepository = settingRepository;
    }

    public Mono<Setting> getCurrentSetting(){
        return settingRepository.findByCurrent(true);
    }

    public Mono<Setting> removeCurrentSetting() {
        return getCurrentSetting().map(setting -> {
            setting.setCurrent(false);
            return setting;
        }).flatMap(settingRepository::save);
    }

    public Mono<Setting> setCurrentSetting(final String name) {
        return getSetting(name).map(setting -> {
            setting.setCurrent(true);
            return setting;
        }).flatMap(settingRepository::save);
    }

    public Flux<Setting> getAllSettings() {
        return settingRepository.findAll();
    }

    public Mono<Setting> getSetting(final String name) {
        return settingRepository.findById(name);
    }

    public Mono<Setting> createSetting(final String name) {
        return settingRepository.save(new Setting(name));
    }

    public Mono<Setting> updateSetting(final String name, final Setting setting) {
        return getSetting(name).map(set -> {
            set.setName(setting.getName());
            set.setMagic(setting.isMagic());
            return set;
        }).flatMap(settingRepository::save);
    }
}
