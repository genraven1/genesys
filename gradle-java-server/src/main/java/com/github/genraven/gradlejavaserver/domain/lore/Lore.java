package com.github.genraven.gradlejavaserver.domain.lore;

import com.fasterxml.jackson.annotation.JsonValue;
import com.github.genraven.gradlejavaserver.domain.Setting;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "lore")
public class Lore {

    protected Lore() {}

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
