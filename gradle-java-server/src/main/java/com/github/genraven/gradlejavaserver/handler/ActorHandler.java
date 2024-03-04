package com.github.genraven.gradlejavaserver.handler;

import com.github.genraven.gradlejavaserver.domain.actor.Actor;
import com.github.genraven.gradlejavaserver.domain.actor.player.Player;
import com.github.genraven.gradlejavaserver.service.actor.PlayerService;
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
public class ActorHandler {

    private final PlayerService playerService;

    @Autowired
    public ActorHandler(final PlayerService playerService) {
        this.playerService = playerService;
    }

    public Mono<ServerResponse> getAllPlayers(final ServerRequest serverRequest) {
        return playerService.getAllPlayers().collectList().flatMap(players -> {
            if(players.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fromValue(players));
        });
    }

    public Mono<ServerResponse> getPlayer(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable(NAME);
        return playerService.getPlayer(name)
                .flatMap(player -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(player)))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    public Mono<ServerResponse> createPlayer(final ServerRequest serverRequest) {
        return playerService.createPlayer(serverRequest.pathVariable("name"))
                .flatMap(player -> ServerResponse.created(getURI(player)).bodyValue(player));
    }

    public Mono<ServerResponse> updatePlayer(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable(NAME);
        final Mono<Player> playerMono = serverRequest.bodyToMono(Player.class);
        return playerMono
                .flatMap(player -> playerService.updatePlayer(name, player))
                .flatMap(player -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(player)))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    private URI getURI(final Actor actor) {
        return UriComponentsBuilder.fromPath(("/{id}")).buildAndExpand(actor.getName()).toUri();
    }
}
