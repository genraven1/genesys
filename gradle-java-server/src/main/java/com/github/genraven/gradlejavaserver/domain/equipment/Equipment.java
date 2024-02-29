package com.github.genraven.gradlejavaserver.domain.equipment;

import com.github.genraven.gradlejavaserver.domain.Setting;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

@Data
public class Equipment {

    protected Equipment() {}

    public Equipment(final String name) {
        this.name = name;
    }

    @Id
    private String name;
    private String description;
    private int price;
    private boolean restricted;
    private int encumbrance;
    private int rarity;
    private List<EquipmentQuality> qualities = new ArrayList<>();
    private List<Setting> settings = new ArrayList<>();
}
