package com.github.genraven.genesys.controller;

import com.github.genraven.genesys.model.Setting;
import com.github.genraven.genesys.service.SettingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping(value="/settings")
public class SettingController {

    private final SettingService settingService;

    @Autowired
    public SettingController(final SettingService settingService) {
        this.settingService = settingService;
    }

    @PostMapping("/current/{name}")
    public ResponseEntity<Setting> setCurrentSetting(@PathVariable final String name) {
        return ResponseEntity.ok(settingService.setCurrentSetting(name));
    }

    @GetMapping("/current")
    public ResponseEntity<Setting> getCurrentSetting() {
        return ResponseEntity.ok(settingService.getCurrentSetting());
    }

    @GetMapping("")
    public ResponseEntity<List<Setting>> getSettings() {
        return ResponseEntity.ok(settingService.getSettings());
    }

    @PostMapping("/{name}")
    public ResponseEntity<Setting> createSetting(@PathVariable final String name) {
        return ResponseEntity.ok(settingService.createSetting(name));
    }

    @GetMapping("/{name}")
    public ResponseEntity<Setting> getSetting(@PathVariable final String name) {
        return ResponseEntity.ok(settingService.getSetting(name));
    }
}