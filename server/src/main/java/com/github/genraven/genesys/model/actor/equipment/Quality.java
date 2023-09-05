package com.github.genraven.genesys.model.actor.equipment;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.genraven.genesys.model.actor.equipment.weapon.WeaponQuality;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "quality")
@Getter
@Setter
public class Quality {

    public Quality(final String name) {
        this.name = name;
    }

    protected Quality(){}

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "passive")
    private boolean passive;

    @Column(name = "cost")
    private int cost;

    @Column(name = "armor")
    private boolean armor;

    @Column(name = "weapon")
    private boolean weapon;

    @OneToMany
    @JsonIgnore
    private List<WeaponQuality> weaponQuality;
}
