package com.github.genraven.genesys.model.actor.equipment.weapon;

import com.github.genraven.genesys.model.actor.equipment.Quality;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "weapon_qualities")
@Getter
@Setter
public class WeaponQuality {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "weapon_id", referencedColumnName = "id")
    private Weapon weapon;

    @JoinColumn(name = "quality_id", referencedColumnName = "id")
    @ManyToOne(cascade = CascadeType.ALL)
    private Quality quality;

    @Column(name = "ranks")
    private int ranks;
}
