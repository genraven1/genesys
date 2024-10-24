package com.github.genraven.genesys.domain.actor;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

@Data
public class Actor {

    protected Actor() {
    }

    public Actor(final String name) {
        this.name = name;
    }

    @Id
    private String id;
    private String name;
    private ActorType type;
    private int brawn = 1;
    private int agility = 1;
    private int intellect = 1;
    private int cunning = 1;
    private int willpower = 1;
    private int presence = 1;
    private int wounds = 1;
    private int soak = getBrawn();
    private List<ActorWeapon> weapons = new ArrayList<>();
    private List<ActorArmor> armors = new ArrayList<>();

    @AllArgsConstructor
    @Getter
    public enum ActorType {
        MINION("Minion"),
        RIVAL("Rival"),
        NEMESIS("Nemesis"),
        PLAYER("Player");

        @JsonValue
        private final String label;
    }
}
