package com.github.genraven.genesys.handler;

import com.github.genraven.genesys.domain.skill.Skill;
import com.github.genraven.genesys.service.SkillService;
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
public class SkillHandler {

    private final SkillService skillService;

    public Mono<ServerResponse> getAllSkills(final ServerRequest serverRequest) {
        return skillService.getAllSkills().collectList().flatMap(skills -> {
            if(skills.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fromValue(skills));
        });
    }

    public Mono<ServerResponse> getSkill(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable(NAME);
        return skillService.getSkill(name)
                .flatMap(skill -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(skill))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> createSkill(final ServerRequest serverRequest) {
        return skillService.createSkill(serverRequest.pathVariable(NAME))
                .flatMap(skill -> ServerResponse.created(getURI(skill)).bodyValue(skill));
    }

    public Mono<ServerResponse> updateSkill(final ServerRequest serverRequest) {
        final String name = serverRequest.pathVariable(NAME);
        final Mono<Skill> skillMono = serverRequest.bodyToMono(Skill.class);
        return skillMono
                .flatMap(skill -> skillService.updateSkill(name, skill))
                .flatMap(skill -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(skill))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> getSkillsForCurrentCampaign(final ServerRequest serverRequest) {
        return skillService.getSkillsForCurrentCampaign()
                .flatMap(skills -> ServerResponse.ok().bodyValue(skills))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    public Mono<ServerResponse> addSkillToCurrentCampaign(final ServerRequest request) {
        return request.bodyToMono(Skill.class)
                .flatMap(skill -> skillService.addSkillToCurrentCampaign(skill.getId()))
                .flatMap(updatedCampaign -> ServerResponse.ok().bodyValue(updatedCampaign))
                .switchIfEmpty(ServerResponse.notFound().build());
    }

    private URI getURI(final Skill skill) {
        return UriComponentsBuilder.fromPath(("/{id}")).buildAndExpand(skill.getName()).toUri();
    }
}
