package com.github.genraven.genesys.model.actor.talent;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonValue;
import com.github.genraven.genesys.model.Setting;
import com.github.genraven.genesys.model.actor.Activation;
import com.github.genraven.genesys.model.actor.Nemesis;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "talent")
@Getter
@Setter
public class Talent {

    public Talent(final String name) {
        this.name = name;
    }

    protected Talent(){}

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "ranked")
    private boolean ranked;

    @Column(name = "activation")
    private Activation activation;

    @Column(name = "tier")
    private Tier tier;

    @Column(name = "summary")
    private String summary;

    @Column(name = "description")
    private String description;

    @OneToMany
    @JoinTable(
            name = "talent_settings",
            joinColumns = @JoinColumn(
                    name = "talent_id",
                    referencedColumnName = "id"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "setting_id",
                    referencedColumnName = "id"
            )
    )
    private List<Setting> settings = new ArrayList<>();

    @OneToMany
    @JsonIgnore
    private List<Nemesis> nemesis;

    @AllArgsConstructor
    @Getter
    public enum Tier {
        FIRST("First"),
        SECOND("Second"),
        THIRD("Third"),
        FOURTH("Fourth"),
        FIFTH("Fifth");

        @JsonValue
        private final String label;
    }
}
