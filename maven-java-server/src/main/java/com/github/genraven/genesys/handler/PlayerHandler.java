package com.github.genraven.genesys.handler;

import com.github.genraven.genesys.domain.actor.player.Player;
import com.github.genraven.genesys.service.PlayerService;
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
public class PlayerHandler {

    private final PlayerService playerService;

    @Autowired
    public PlayerHandler(final PlayerService playerService) {
        this.playerService = playerService;
    }

    public Mono<ServerResponse> getAllPlayers(final ServerRequest serverRequest) {
        return playerService.getAllPlayers().collectList().flatMap(players -> {
            if(players.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(fromValue(players));
        });
    }

    public Mono<ServerResponse> getPlayer(final ServerRequest serverRequest) {
        final Long id = Long.valueOf(serverRequest.pathVariable("id"));
        return playerService.getPlayer(id)
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
        final Long id = Long.valueOf(serverRequest.pathVariable("id"));
        final Mono<Player> playerMono = serverRequest.bodyToMono(Player.class);
        return playerMono
                .flatMap(player -> playerService.updatePlayer(id, player))
                .flatMap(player -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(player)))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    private URI getURI(final Player player) {
        return UriComponentsBuilder.fromPath(("/{id}")).buildAndExpand(player.getId()).toUri();
    }
}
