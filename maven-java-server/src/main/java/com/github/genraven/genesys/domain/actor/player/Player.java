package com.github.genraven.genesys.domain.actor.player;

import com.github.genraven.genesys.domain.actor.Actor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Document(collection = "players")
public class Player extends Actor {

    @Id
    private Long id;
    private List<PlayerSkill> skills;
}
