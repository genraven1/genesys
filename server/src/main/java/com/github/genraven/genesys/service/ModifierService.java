package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.modifier.CriticalInjuryModifier;
import com.github.genraven.genesys.domain.modifier.ModifierType;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.util.ArrayList;
import java.util.List;

@Service
public class ModifierService {

    public Flux<ModifierType> getModifierTypes(final String type) {
        List<ModifierType> modifierTypes = new ArrayList<>();
        if (type.equalsIgnoreCase("criticalinjury")) {
            modifierTypes.addAll(List.of(CriticalInjuryModifier.values()));
        }
        return Flux.fromIterable(modifierTypes);
    }
}
