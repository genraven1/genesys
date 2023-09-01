package com.github.genraven.genesys.repository;

import com.github.genraven.genesys.model.actor.equipment.weapon.Weapon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WeaponRepository extends JpaRepository<Weapon, Long> {
}
