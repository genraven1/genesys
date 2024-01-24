package com.github.genraven.genesys.handler;

import com.github.genraven.genesys.domain.Setting;
import com.github.genraven.genesys.service.SettingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
public class SettingHandler {
    private final SettingService settingService;

    @Autowired
    public SettingHandler(final SettingService settingService) {
        this.settingService = settingService;
    }

    public Mono<ServerResponse> getCurrentSetting(final ServerRequest serverRequest) {
        return settingService.getCurrentSetting()
                .flatMap(setting -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(setting))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> getAllSettings(final ServerRequest serverRequest) {
        return settingService.getAllSettings().collectList().flatMap(settings -> {
            if (settings.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fromValue(settings));
        });
    }

    public Mono<ServerResponse> getSettingById(final ServerRequest serverRequest) {
        final Long id = Long.valueOf(serverRequest.pathVariable("id"));
        return settingService.getSettingById(id)
                .flatMap(setting -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(setting))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> createSetting(final ServerRequest serverRequest) {
        return settingService.createSetting(serverRequest.pathVariable(NAME))
                .flatMap(setting -> ServerResponse.created(getURI(setting)).bodyValue(setting));
    }

    private URI getURI(final Setting setting) {
        return UriComponentsBuilder.fromPath(("/{id}")).buildAndExpand(setting.getId()).toUri();
    }
}
