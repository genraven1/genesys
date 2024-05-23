package com.github.genraven.gradlejavaserver.domain.campaign;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class Party {

    private List<Character> characters = new ArrayList<>();
}
