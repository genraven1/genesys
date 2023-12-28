package com.github.genraven.genesys.handler;

import com.github.genraven.genesys.domain.Setting;
import com.github.genraven.genesys.service.SettingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import static com.github.genraven.genesys.constants.CommonConstants.ID;
import static com.github.genraven.genesys.constants.CommonConstants.NAME;

@Component
public class SettingHandler {
    @Autowired
    private SettingService settingService;

    public Mono<ServerResponse> getSettingById(final ServerRequest serverRequest) {
        return settingService.getSettingById(Long.valueOf(serverRequest.pathVariable(ID)))
                .flatMap(settingResponse -> ServerResponse.status(HttpStatus.OK)
                        .body(Mono.just(settingResponse), Setting.class));
    }

    public Mono<ServerResponse> createSetting(final ServerRequest serverRequest) {
        return settingService.createSetting(serverRequest.pathVariable(NAME))
                .flatMap(settingResponse -> ServerResponse.status(HttpStatus.CREATED)
                        .body(Mono.just(settingResponse), Setting.class));
    }
}
