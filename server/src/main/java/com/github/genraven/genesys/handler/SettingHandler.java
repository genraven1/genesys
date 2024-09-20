package com.github.genraven.genesys.handler;

import com.github.genraven.genesys.domain.Setting;
import com.github.genraven.genesys.domain.Talent;
import com.github.genraven.genesys.service.SettingService;
import org.bson.types.ObjectId;
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

    public Mono<ServerResponse> removeCurrentSetting(final ServerRequest serverRequest) {
        return settingService.removeCurrentSetting()
                .flatMap(setting -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(setting))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> setCurrentSetting(final ServerRequest serverRequest) {
        return settingService.setCurrentSetting(serverRequest.pathVariable(NAME))
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

    public Mono<ServerResponse> getSetting(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable(NAME);
        return settingService.getSetting(name)
                .flatMap(setting -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(setting))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> createSetting(final ServerRequest serverRequest) {
        return settingService.createSetting(serverRequest.pathVariable(NAME))
                .flatMap(setting -> ServerResponse.created(getURI(setting)).bodyValue(setting));
    }

    public Mono<ServerResponse> updateSetting(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable("name");
        final Mono<Setting> settingMono = serverRequest.bodyToMono(Setting.class);
        return settingMono
                .flatMap(setting -> settingService.updateSetting(name, setting))
                .flatMap(setting -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(setting))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    private URI getURI(final Setting setting) {
        return UriComponentsBuilder.fromPath(("/{id}")).buildAndExpand(setting.getName()).toUri();
    }
}
