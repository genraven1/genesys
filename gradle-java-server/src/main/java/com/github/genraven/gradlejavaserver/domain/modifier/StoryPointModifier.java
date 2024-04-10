package com.github.genraven.gradlejavaserver.domain.modifier;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum StoryPointModifier implements ModifierType {
    MOVE_STORY_POINT("Move Story Point");

    @JsonValue
    private final String label;
}
