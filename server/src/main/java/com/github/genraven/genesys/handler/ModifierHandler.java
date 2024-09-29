package com.github.genraven.genesys.handler;

import com.github.genraven.genesys.service.ModifierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import static org.springframework.web.reactive.function.BodyInserters.fromValue;

@Component
public class ModifierHandler {

    private final ModifierService modifierService;

    @Autowired
    public ModifierHandler(final ModifierService modifierService) {
        this.modifierService = modifierService;
    }

    public Mono<ServerResponse> getModifiers(final ServerRequest serverRequest) {
        return modifierService.getModifiers().collectList().flatMap(modifierTypes -> {
            if (modifierTypes.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fromValue(modifierTypes));
        });
    }
}
