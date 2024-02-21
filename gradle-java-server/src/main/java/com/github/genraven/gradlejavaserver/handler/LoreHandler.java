package com.github.genraven.gradlejavaserver.handler;

import com.github.genraven.gradlejavaserver.domain.lore.Lore;
import com.github.genraven.gradlejavaserver.service.LoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;

import java.net.URI;

import static com.github.genraven.gradlejavaserver.constants.CommonConstants.NAME;
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

    public Mono<ServerResponse> createOrganization(final ServerRequest serverRequest) {
        return loreService.createOrganization(serverRequest.pathVariable(NAME))
                .flatMap(organization -> ServerResponse.created(getURI(organization)).bodyValue(organization));
    }

    private URI getURI(final Lore lore) {
        return UriComponentsBuilder.fromPath(("/{id}")).buildAndExpand(lore.getName()).toUri();
    }
}
