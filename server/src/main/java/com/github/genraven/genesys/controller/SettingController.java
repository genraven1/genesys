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

    @PostMapping("/current/{id}")
    public ResponseEntity<Setting> setCurrentSetting(@PathVariable final Long id) {
        return ResponseEntity.ok(settingService.setCurrentSetting(id));
    }

    @GetMapping("/current")
    public ResponseEntity<Setting> getCurrentSetting() {
        return ResponseEntity.ok(settingService.getCurrentSetting());
    }

    @GetMapping("/")
    public ResponseEntity<List<Setting>> getSettings() {
        return ResponseEntity.ok(settingService.getSettings());
    }

    @PostMapping("/{name}")
    public ResponseEntity<Setting> createSetting(@PathVariable final String name) {
        return ResponseEntity.ok(settingService.createSetting(name));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Setting> getSetting(@PathVariable final Long id) {
        return ResponseEntity.ok(settingService.getSetting(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Setting> updateSetting(@PathVariable final Long id, @RequestBody final Setting setting) {
        return ResponseEntity.ok(settingService.updateSetting(id, setting));
    }
}