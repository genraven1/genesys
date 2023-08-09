package com.github.genraven.genesys.service;

import com.github.genraven.genesys.model.Setting;
import com.github.genraven.genesys.repository.SettingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SettingService {

    private final SettingRepository settingRepository;

    @Autowired
    public SettingService(final SettingRepository settingRepository) {
        this.settingRepository = settingRepository;
    }

    public Setting getCurrentSetting() {
        return findAllSettings().stream().filter(Setting::isCurrent).findFirst().orElse(new Setting(""));
    }

    public Setting setCurrentSetting(final String name) {
        Setting current = null;
        for (final Setting setting : findAllSettings()) {
            if (setting.getName().equals(name)) {
                setting.setCurrent(true);
                current = setting;
            }
            else {
                setting.setCurrent(false);
            }
            updateSetting(setting);
        }
        return current;
    }

    public List<Setting> findAllSettings() {
        return settingRepository.findAll();
    }

    public Setting createSetting(final String name) {
        return settingRepository.save(new Setting(name));
    }

    public Setting updateSetting(final Setting setting) {
        return settingRepository.save(setting);
    }

    public Setting getSetting(final String name) {
        return settingRepository.findByName(name);
    }

    public List<Setting> getSettings() {
        return settingRepository.findAll();
    }
}