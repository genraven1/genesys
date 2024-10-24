package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.modifier.Modifier;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.util.List;

@Service
public class ModifierService {

    public Flux<Modifier.Type> getModifiers() {
        return Flux.fromIterable(List.of(Modifier.Type.values()));
    }
}
