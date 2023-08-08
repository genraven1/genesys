package com.github.genraven.genesys.service;

import com.github.genraven.genesys.model.Setting;
import com.github.genraven.genesys.repository.SettingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SettingService {
    
    @Autowired
    private SettingRepository settingRepository;
    
    public Setting getCurrentSetting() {
        return new Setting("");
    }
}