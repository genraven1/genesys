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

    public Setting setCurrentSetting(final Long id) {
        Setting current = null;
        for (final Setting setting : findAllSettings()) {
            if (setting.getId() == id) {
                setting.setCurrent(true);
                current = setting;
            }
            else {
                setting.setCurrent(false);
            }
            updateSetting(setting.getId(), setting);
        }
        return current;
    }

    public List<Setting> findAllSettings() {
        return settingRepository.findAll();
    }

    public Setting createSetting(final String name) {
        return settingRepository.save(new Setting(name));
    }

    public Setting updateSetting(final Long id, final Setting setting) {
        final Setting oldSetting = getSetting(id);
        oldSetting.setMagic(setting.isMagic());
        oldSetting.setCurrent(setting.isCurrent());
        return settingRepository.save(setting);
    }

    public Setting getSetting(final Long id) {
        return settingRepository.findById(id).orElse(new Setting(""));
    }

    public List<Setting> getSettings() {
        return settingRepository.findAll();
    }
}