package com.github.genraven.gradlejavaserver.handler;

import com.github.genraven.gradlejavaserver.service.LoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import static org.springframework.web.reactive.function.BodyInserters.fromValue;

@Component
public class LoreHandler {

    private final LoreService loreService;

    @Autowired
    public LoreHandler(final LoreService loreService) {
        this.loreService = loreService;
    }

    public Mono<ServerResponse> getAllLore(final ServerRequest serverRequest) {
        return loreService.getAllLore().collectList().flatMap(lores -> {
            if (lores.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fromValue(lores));
        });
    }

    public Mono<ServerResponse> getAllOrganizations(final ServerRequest serverRequest) {
        return loreService.getAllOrganizations().collectList().flatMap(organizations -> {
            if (organizations.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fromValue(organizations));
        });
    }
}
