package com.github.genraven.genesys.handler;

import com.github.genraven.genesys.domain.actor.player.Archetype;
import com.github.genraven.genesys.service.ArchetypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;

import java.net.URI;

import static com.github.genraven.genesys.constants.CommonConstants.NAME;
import static org.springframework.web.reactive.function.BodyInserters.fromValue;

@Component
public class ArchetypeHandler {
    private final ArchetypeService archetypeService;

    @Autowired
    public ArchetypeHandler(final ArchetypeService archetypeService) {
        this.archetypeService = archetypeService;
    }

    public Mono<ServerResponse> getAllArchetypes(final ServerRequest serverRequest) {
        return archetypeService.getAllArchetypes().collectList().flatMap(archetypes -> {
            if(archetypes.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fromValue(archetypes));
        });
    }

    public Mono<ServerResponse> getArchetype(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable(NAME);
        return archetypeService.getArchetype(name)
                .flatMap(archetype -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(archetype))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> createArchetype(final ServerRequest serverRequest) {
        return archetypeService.createArchetype(serverRequest.pathVariable(NAME))
                .flatMap(archetype -> ServerResponse.created(getURI(archetype)).bodyValue(archetype));
    }

    public Mono<ServerResponse> updateArchetype(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable(NAME);
        final Mono<Archetype> archetypeMono = serverRequest.bodyToMono(Archetype.class);
        return archetypeMono
                .flatMap(archetype -> archetypeService.updateArchetype(name, archetype))
                .flatMap(archetype -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(archetype))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    private URI getURI(final Archetype archetype) {
        return UriComponentsBuilder.fromPath(("/{id}")).buildAndExpand(archetype.getName()).toUri();
    }
}
