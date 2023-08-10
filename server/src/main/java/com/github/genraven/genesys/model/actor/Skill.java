package com.github.genraven.genesys.model.actor;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "skill")
@Getter
@Setter
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "type")
    private Type type;

    @Column(name="characteristic")
    private Characteristic characteristic;

    @AllArgsConstructor
    @Getter
    public enum Type {
        GENERAL("General"),
        MAGIC("Magic"),
        SOCIAL("Social"),
        KNOWLEDGE("Knowledge"),
        COMBAT("Combat");

        private final String label;
    }
}
