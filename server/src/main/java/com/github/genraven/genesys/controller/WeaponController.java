package com.github.genraven.genesys.controller;

import com.github.genraven.genesys.model.actor.equipment.Quality;
import com.github.genraven.genesys.model.actor.equipment.weapon.Weapon;
import com.github.genraven.genesys.service.WeaponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping(value = "/equipment/weapon")
public class WeaponController {
    private final WeaponService weaponService;

    @Autowired
    public WeaponController(final WeaponService weaponService) {
        this.weaponService = weaponService;
    }

    @GetMapping("/")
    public ResponseEntity<List<Weapon>> getWeapons() {
        return ResponseEntity.ok(weaponService.getWeapons());
    }

    @PostMapping("/{name}")
    public ResponseEntity<Weapon> createWeapon(@PathVariable final String name) {
        return ResponseEntity.ok(weaponService.createWeapon(name));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Weapon> getWeapon(@PathVariable final Long id) {
        return ResponseEntity.ok(weaponService.getWeapon(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Weapon> updateWeapon(@PathVariable final Long id, @RequestBody final Weapon weapon) {
        return ResponseEntity.ok(weaponService.updateWeapon(id, weapon));
    }

    @PutMapping("/{id}/quality")
    public ResponseEntity<Weapon> updateWeaponQuality(@PathVariable final Long id, @RequestBody final Quality quality) {
        return ResponseEntity.ok(weaponService.updateWeaponQuality(id, quality));
    }
}
