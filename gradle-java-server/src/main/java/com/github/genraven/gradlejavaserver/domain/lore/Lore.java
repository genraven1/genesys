package com.github.genraven.gradlejavaserver.domain.lore;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "lore")
public class Lore {
    @Id
    private String name;
}
