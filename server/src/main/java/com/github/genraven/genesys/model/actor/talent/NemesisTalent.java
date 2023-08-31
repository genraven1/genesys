package com.github.genraven.genesys.model.actor.talent;

import com.github.genraven.genesys.model.actor.Nemesis;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "nemesis_talents")
@Getter
@Setter
public class NemesisTalent {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "nemesis_id", referencedColumnName = "id")
    private Nemesis nemesis;

    @JoinColumn(name = "talent_id", referencedColumnName = "id")
    @ManyToOne(cascade = CascadeType.ALL)
    private Talent talent;

    @Column(name = "ranks")
    private int ranks;
}
