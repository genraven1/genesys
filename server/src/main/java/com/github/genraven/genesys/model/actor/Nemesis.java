package com.github.genraven.genesys.model.actor;

import com.github.genraven.genesys.model.Setting;
import com.github.genraven.genesys.model.actor.talent.NemesisTalent;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

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

    @Column(name = "wound")
    private int wound;

    @Column(name = "strain")
    private int strain;

    @Column(name = "combat")
    private int combat;

    @Column(name = "social")
    private int social;

    @Column(name = "general")
    private int general;

    private int soak = determineSoak();


    private List<NemesisTalent> talents = new ArrayList<>();

    @OneToMany
    @JoinTable(
            name = "nemesis_settings",
            joinColumns = @JoinColumn(
                    name = "nemesis_id",
                    referencedColumnName = "id"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "setting_id",
                    referencedColumnName = "id"
            )
    )
    private List<Setting> settings = new ArrayList<>();

    private int determineSoak() {
        return brawn;
    }
}
