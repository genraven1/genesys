package com.github.genraven.genesys.model.actor.equipment.armor;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "armor")
@Getter
@Setter
public class Armor {

    public Armor(final String name) {
        this.name = name;
    }

    protected Armor(){}

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name")
    private String name;
}
