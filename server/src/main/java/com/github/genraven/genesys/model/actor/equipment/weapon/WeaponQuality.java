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

    public WeaponQuality(final Weapon weapon, final Quality quality, final int ranks) {
        this.weapon = weapon;
        this.quality = quality;
        this.ranks = ranks;
    }

    protected WeaponQuality() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    @ManyToOne
    @JoinColumn(name = "weapon_id", referencedColumnName = "id")
    private Weapon weapon;

    @JoinColumn(name = "qualities_id", referencedColumnName = "id")
    @ManyToOne
    private Quality quality;

    @Column(name = "ranks")
    private int ranks;

    public void addRanks() {
        this.setRanks(getRanks() + 1);
    }
}
