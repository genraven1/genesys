package com.github.genraven.genesys.model.actor.equipment.armor;

import com.github.genraven.genesys.model.actor.equipment.Quality;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "armor_qualities")
@Getter
@Setter
public class ArmorQuality {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "armor_id", referencedColumnName = "id")
    private Armor armor;

    @JoinColumn(name = "quality_id", referencedColumnName = "id")
    @ManyToOne(cascade = CascadeType.ALL)
    private Quality quality;

    @Column(name = "ranks")
    private int ranks;
}
