package com.github.genraven.genesys.model.actor;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonValue;
import com.github.genraven.genesys.model.Setting;
import com.github.genraven.genesys.model.actor.equipment.weapon.Weapon;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "skill")
@Getter
@Setter
public class Skill {

    public Skill(final String name) {
        this.name = name;
    }

    protected Skill(){}

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private Type type;

    @Column(name="characteristic")
    private Characteristic characteristic;

    @OneToMany
    @JoinTable(
            name = "skill_settings",
            joinColumns = @JoinColumn(
                    name = "skill_id",
                    referencedColumnName = "id"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "setting_id",
                    referencedColumnName = "id"
            )
    )
    private List<Setting> settings = new ArrayList<>();

    @OneToOne
    @JsonIgnore
    private Weapon weapon;

    @AllArgsConstructor
    @Getter
    public enum Type {
        GENERAL("General"),
        MAGIC("Magic"),
        SOCIAL("Social"),
        KNOWLEDGE("Knowledge"),
        COMBAT("Combat");

        @JsonValue
        private final String label;
    }
}
