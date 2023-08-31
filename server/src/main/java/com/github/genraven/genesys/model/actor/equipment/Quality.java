package com.github.genraven.genesys.model.actor.equipment;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

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
    @GeneratedValue(strategy = GenerationType.AUTO)
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
}
