package com.github.genraven.genesys.domain;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Setting {
    @Id
    private Long id;
    private String name;
    private boolean magic;
    private boolean current;
}
