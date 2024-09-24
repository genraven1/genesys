package com.github.genraven.genesys.domain.equipment;

import com.github.genraven.genesys.domain.modifier.Modifier;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

@Data
public class Equipment {

    protected Equipment() {
    }

    public Equipment(final String name) {
        this.name = name;
    }

    @Id
    private String name;
    private String description;
    private int price = 0;
    private boolean restricted = false;
    private int encumbrance = 0;
    private int rarity = 0;
    private List<Modifier> modifiers = new ArrayList<>();
    private List<EquipmentQuality> qualities = new ArrayList<>();
}
