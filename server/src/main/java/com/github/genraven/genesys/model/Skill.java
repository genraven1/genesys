package com.github.genraven.genesys.model;

import jakarta.persistence.*;
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

    public enum Type {
        GENERAL, MAGIC, SOCIAL, KNOWLEDGE, COMBAT;
    }
}
