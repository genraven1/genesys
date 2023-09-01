package com.github.genraven.genesys.repository;

import com.github.genraven.genesys.model.actor.equipment.weapon.WeaponQuality;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WeaponQualityRepository extends JpaRepository<WeaponQuality, Long> {
}
