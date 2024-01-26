package com.github.genraven.gradlejavaserver.domain;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigInteger;

@Data
@Document(collection = "settings")
public class Setting {

    public Setting(final String name) {
        this.name = name;
    }

    @Id
    private BigInteger id;
    private String name;
    private boolean magic;
    private boolean current;
}
