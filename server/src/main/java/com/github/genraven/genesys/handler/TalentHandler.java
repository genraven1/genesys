package com.github.genraven.genesys.handler;

import com.github.genraven.genesys.domain.Talent;
import com.github.genraven.genesys.service.TalentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;

import java.net.URI;

import static org.springframework.web.reactive.function.BodyInserters.fromValue;

@Component
public class TalentHandler {

    private final TalentService talentService;

    @Autowired
    public TalentHandler(final TalentService talentService) {
        this.talentService = talentService;
    }

    public Mono<ServerResponse> getAllTalents(final ServerRequest serverRequest) {
        return talentService.getAllTalents().collectList().flatMap(talents -> {
            if(talents.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fromValue(talents));
        });
    }

    public Mono<ServerResponse> getTalent(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable("name");
        return talentService.getTalent(name)
                .flatMap(talent -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(talent))
                    .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> createTalent(final ServerRequest serverRequest) {
        final Mono<Talent> talentMono = serverRequest.bodyToMono(Talent.class);
        return talentMono
                .flatMap(talentService::createTalent)
                .flatMap(talent -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(talent))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> updateTalent(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable("name");
        final Mono<Talent> talentMono = serverRequest.bodyToMono(Talent.class);
        return talentMono
                .flatMap(talent -> talentService.updateTalent(name, talent))
                .flatMap(talent -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(talent))
                .switchIfEmpty(ServerResponse.notFound().build()));
    }

    private URI getURI(final Talent talent) {
        return UriComponentsBuilder.fromPath(("/{id}")).buildAndExpand(talent.getName()).toUri();
    }
}
