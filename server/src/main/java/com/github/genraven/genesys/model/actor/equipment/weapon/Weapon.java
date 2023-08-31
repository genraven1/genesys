package com.github.genraven.genesys.model.actor.equipment.weapon;

import com.github.genraven.genesys.model.Setting;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "weapon")
@Getter
@Setter
public class Weapon {

    public Weapon(final String name) {
        this.name = name;
    }

    protected Weapon(){}

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private int price;

    @Column(name = "encumbrance")
    private int encumbrance;

    @Column(name = "rarity")
    private int rarity;

    @Column(name = "restricted")
    private boolean restricted;

    @OneToMany
    private List<WeaponQuality> qualities = new ArrayList<>();

    @OneToMany
    @JoinTable(
            name = "weapon_settings",
            joinColumns = @JoinColumn(
                    name = "weapon_id",
                    referencedColumnName = "id"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "setting_id",
                    referencedColumnName = "id"
            )
    )
    private List<Setting> settings = new ArrayList<>();
}
