package com.github.genraven.genesys.handler;

import com.github.genraven.genesys.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

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
}
