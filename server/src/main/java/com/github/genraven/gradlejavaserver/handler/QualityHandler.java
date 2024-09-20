package com.github.genraven.gradlejavaserver.handler;

import com.github.genraven.gradlejavaserver.domain.equipment.Quality;
import com.github.genraven.gradlejavaserver.service.QualityService;
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
public class QualityHandler {

    private final QualityService qualityService;

    @Autowired
    public QualityHandler(final QualityService qualityService) {
        this.qualityService = qualityService;
    }

    public Mono<ServerResponse> getAllQualities(final ServerRequest serverRequest) {
        return qualityService.getAllQualities().collectList().flatMap(qualities -> {
            if (qualities.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fromValue(qualities));
        });
    }

    public Mono<ServerResponse> getQuality(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable("name");
        return qualityService.getQuality(name)
                .flatMap(quality -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(quality))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> createQuality(final ServerRequest serverRequest) {
        return qualityService.createQuality(serverRequest.pathVariable("name"))
                .flatMap(quality -> ServerResponse.created(getURI(quality)).bodyValue(quality));
    }

    public Mono<ServerResponse> updateQuality(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable("name");
        final Mono<Quality> qualityMono = serverRequest.bodyToMono(Quality.class);
        return qualityMono
                .flatMap(quality -> qualityService.updateQuality(name, quality))
                .flatMap(quality -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(quality))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    private URI getURI(final Quality quality) {
        return UriComponentsBuilder.fromPath(("/{id}")).buildAndExpand(quality.getName()).toUri();
    }
}
