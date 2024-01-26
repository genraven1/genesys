package com.github.genraven.gradlejavaserver.domain.skill;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum SkillType {
    GENERAL("General"),
    MAGIC("Magic"),
    COMBAT("Combat"),
    SOCIAL("Social"),
    KNOWLEDGE("Knowledge");

    @JsonValue
    private final String label;
}
