package com.github.genraven.genesys.handler;

import com.github.genraven.genesys.domain.Talent;
import com.github.genraven.genesys.service.TalentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import static com.github.genraven.genesys.constants.CommonConstants.ID;
import static com.github.genraven.genesys.constants.CommonConstants.NAME;

@Component
public class TalentHandler {

    @Autowired
    private TalentService talentService;

    public Mono<ServerResponse> getTalentById(final ServerRequest serverRequest) {
        return talentService.getTalentById(Long.valueOf(serverRequest.pathVariable(ID)))
                .flatMap(talentResponse -> ServerResponse.status(HttpStatus.OK)
                        .body(Mono.just(talentResponse), Talent.class));
    }

    public Mono<ServerResponse> createTalent(final ServerRequest serverRequest) {
        return talentService.createTalent(serverRequest.pathVariable(NAME))
                .flatMap(talentResponse -> ServerResponse.status(HttpStatus.CREATED)
                        .body(Mono.just(talentResponse), Talent.class));
    }
}
