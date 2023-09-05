package com.github.genraven.genesys.service;

import com.github.genraven.genesys.model.actor.equipment.Quality;
import com.github.genraven.genesys.model.actor.equipment.weapon.Weapon;
import com.github.genraven.genesys.model.actor.equipment.weapon.WeaponQuality;
import com.github.genraven.genesys.repository.WeaponQualityRepository;
import com.github.genraven.genesys.repository.WeaponRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class WeaponService {
    private final WeaponRepository weaponRepository;
    private final WeaponQualityRepository weaponQualityRepository;

    public WeaponService(final WeaponRepository weaponRepository, final WeaponQualityRepository weaponQualityRepository) {
        this.weaponRepository = weaponRepository;
        this.weaponQualityRepository = weaponQualityRepository;
    }

    public Weapon createWeapon(final String name) {
        return weaponRepository.save(new Weapon(name));
    }

    public Weapon updateWeapon(final Long id, final Weapon weapon) {
        return weaponRepository.save(weapon);
    }

    public Weapon getWeapon(final Long id) {
        return weaponRepository.findById(id).orElse(new Weapon(""));
    }

    public List<Weapon> getWeapons() {
        return weaponRepository.findAll();
    }

    public Weapon updateWeaponQuality(final Long id, final Quality quality) {
        final Weapon weapon = getWeapon(id);

        if (weapon.getQualities().isEmpty()) {
            final WeaponQuality weaponQuality = new WeaponQuality(weapon, quality, 1);
            weapon.setQualities(Collections.singletonList(weaponQuality));
            weaponQualityRepository.save(weaponQuality);
        }
        else {
            weapon.getQualities().forEach(weaponQuality -> {
                if (weaponQuality.getId() == quality.getId()) {
                    weaponQuality.addRanks();
                    weaponQualityRepository.save(weaponQuality);
                } else {
                    weaponQualityRepository.save(new WeaponQuality(weapon, quality, 1));
                }
            });
        }
        return weaponRepository.save(weapon);
    }
}
