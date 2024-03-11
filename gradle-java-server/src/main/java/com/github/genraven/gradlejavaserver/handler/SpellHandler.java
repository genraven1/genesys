package com.github.genraven.gradlejavaserver.handler;

import com.github.genraven.gradlejavaserver.domain.spell.Spell;
import com.github.genraven.gradlejavaserver.service.SpellService;
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
public class SpellHandler {
    private final SpellService spellService;

    @Autowired
    public SpellHandler(final SpellService spellService) {
        this.spellService = spellService;
    }

    public Mono<ServerResponse> getAllSpells(final ServerRequest serverRequest) {
        return spellService.getAllSpells().collectList().flatMap(spells -> {
            if(spells.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fromValue(spells));
        });
    }

    public Mono<ServerResponse> getSpell(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable(NAME);
        return spellService.getSpell(name)
                .flatMap(spell -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(spell))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> createSpell(final ServerRequest serverRequest) {
        return spellService.createSpell(serverRequest.pathVariable(NAME))
                .flatMap(spell -> ServerResponse.created(getURI(spell)).bodyValue(spell));
    }

    public Mono<ServerResponse> updateSpell(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable(NAME);
        final Mono<Spell> spellMono = serverRequest.bodyToMono(Spell.class);
        return spellMono
                .flatMap(spell -> spellService.updateSpell(name, spell))
                .flatMap(spell -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(spell))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    private URI getURI(final Spell spell) {
        return UriComponentsBuilder.fromPath(("/{id}")).buildAndExpand(spell.getName()).toUri();
    }
}
