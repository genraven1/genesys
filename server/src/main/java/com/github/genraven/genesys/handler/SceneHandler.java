package com.github.genraven.genesys.handler;

import com.github.genraven.genesys.domain.Talent;
import com.github.genraven.genesys.domain.campaign.Scene;
import com.github.genraven.genesys.service.SceneService;
import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
public class SceneHandler {

    private final SceneService sceneService;

    public Mono<ServerResponse> getAllScenes(final ServerRequest serverRequest) {
        return sceneService.getAllScenes().collectList().flatMap(scenes -> {
            if(scenes.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fromValue(scenes));
        });
    }

    public Mono<ServerResponse> getScene(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable(NAME);
        return sceneService.getScene(name)
                .flatMap(scene -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(scene))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> createScene(final ServerRequest serverRequest) {
        return sceneService.createScene(serverRequest.pathVariable(NAME))
                .flatMap(scene -> ServerResponse.created(getURI(scene)).bodyValue(scene));
    }

    public Mono<ServerResponse> updateScene(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable(NAME);
        final Mono<Scene> sceneMono = serverRequest.bodyToMono(Scene.class);
        return sceneMono
                .flatMap(scene -> sceneService.updateScene(name, scene))
                .flatMap(scene -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(scene))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> getScenesForCurrentCampaign(final ServerRequest serverRequest) {
        return sceneService.getScenesForCurrentCampaign()
                .flatMap(scenes -> ServerResponse.ok().bodyValue(scenes))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    public Mono<ServerResponse> addSceneToCurrentCampaign(final ServerRequest request) {
        return request.bodyToMono(Scene.class)
                .flatMap(scene -> sceneService.addSceneToCurrentCampaign(scene.getId()))
                .flatMap(updatedCampaign -> ServerResponse.ok().bodyValue(updatedCampaign))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    private URI getURI(final Scene scene) {
        return UriComponentsBuilder.fromPath(("/{id}")).buildAndExpand(scene.getName()).toUri();
    }
}
