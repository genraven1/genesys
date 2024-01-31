package com.github.genraven.javaserver.service;

import com.github.genraven.javaserver.domain.Setting;
import com.github.genraven.javaserver.repository.SettingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SettingService {
    @Autowired
    private SettingRepository settingRepository;

    public Setting getCurrentSetting(){
        return settingRepository.findByCurrent(true);
    }

    public List<Setting> getAllSettings() {
        return settingRepository.findAll();
    }

    public Setting getSettingById(final Long id) {
        return settingRepository.findById(id).orElseThrow();
    }

    public Setting createSetting(final String name) {
        return settingRepository.save(new Setting(name));
    }
}
