package com.github.genraven.genesys.model.roll;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Roll extends RollResults {
    private int boost;

    private int ability;

    private int proficiency;

    private int setback;

    private int difficulty;

    private int challenge;
}
