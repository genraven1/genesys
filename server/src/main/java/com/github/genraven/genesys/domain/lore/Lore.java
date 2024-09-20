package com.github.genraven.genesys.domain.lore;

import com.fasterxml.jackson.annotation.JsonValue;
import com.github.genraven.genesys.domain.Setting;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

@Data
public class Lore {

    protected Lore() {}

    public Lore(final String name) {
        this.name = name;
    }

    @Id
    private String name;
    private Type type;
    private List<Setting> settings = new ArrayList<>();

    @Getter
    @AllArgsConstructor
    public enum Type {
        ORGANIZATION("Organization");

        @JsonValue
        private final String type;
    }
}
