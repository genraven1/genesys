package com.github.genraven.gradlejavaserver.domain;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "settings")
public class Setting {

    public Setting(final String name) {
        this.name = name;
    }

    protected Setting() {}

    @Id
    private String name;
    private boolean magic;
    private boolean current;
}
