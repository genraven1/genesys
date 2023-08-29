package com.github.genraven.genesys.model.actor;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "nemesis")
@Getter
@Setter
public class Nemesis {

    public Nemesis(final String name) {
        this.name = name;
    }

    protected Nemesis() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private Type type = Type.NEMESIS;

    @Column(name = "brawn")
    private int brawn;

    @Column(name = "agility")
    private int agility;

    @Column(name = "intellect")
    private int intellect;

    @Column(name = "cunning")
    private int cunning;

    @Column(name = "willpower")
    private int willpower;

    @Column(name = "presence")
    private int presence;

    private int soak = determineSoak();

    private int determineSoak() {
        return brawn;
    }
}
