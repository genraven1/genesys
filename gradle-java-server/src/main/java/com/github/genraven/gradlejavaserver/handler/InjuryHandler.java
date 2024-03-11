package com.github.genraven.gradlejavaserver.handler;

import com.github.genraven.gradlejavaserver.domain.CriticalInjury;
import com.github.genraven.gradlejavaserver.service.InjuryService;
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
public class InjuryHandler {

    private final InjuryService injuryService;

    @Autowired
    public InjuryHandler(final InjuryService injuryService) {
        this.injuryService = injuryService;
    }

    public Mono<ServerResponse> getAllInjuries(final ServerRequest serverRequest) {
        return injuryService.getAllInjuries().collectList().flatMap(injuries -> {
            if(injuries.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fromValue(injuries));
        });
    }

    public Mono<ServerResponse> getInjury(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable(NAME);
        return injuryService.getInjury(name)
                .flatMap(injury -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(injury))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> createInjury(final ServerRequest serverRequest) {
        return injuryService.createInjury(serverRequest.pathVariable(NAME))
                .flatMap(injury -> ServerResponse.created(getURI(injury)).bodyValue(injury));
    }

    public Mono<ServerResponse> updateInjury(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable("name");
        final Mono<CriticalInjury> criticalInjuryMono = serverRequest.bodyToMono(CriticalInjury.class);
        return criticalInjuryMono
                .flatMap(injury -> injuryService.updateInjury(name, injury))
                .flatMap(injury -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(injury))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    private URI getURI(final CriticalInjury injury) {
        return UriComponentsBuilder.fromPath(("/{id}")).buildAndExpand(injury.getName()).toUri();
    }
}
