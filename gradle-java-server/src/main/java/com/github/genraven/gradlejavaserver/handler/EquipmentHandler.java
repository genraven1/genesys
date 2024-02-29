package com.github.genraven.gradlejavaserver.handler;

import com.github.genraven.gradlejavaserver.domain.equipment.Equipment;
import com.github.genraven.gradlejavaserver.domain.equipment.Gear;
import com.github.genraven.gradlejavaserver.service.equipment.GearService;
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
public class EquipmentHandler {

    private final GearService gearService;

    @Autowired
    public EquipmentHandler(final GearService gearService) {
        this.gearService = gearService;
    }

    public Mono<ServerResponse> getAllGears(final ServerRequest serverRequest) {
        return gearService.getAllGears().collectList().flatMap(gears -> {
            if (gears.isEmpty()) {
                return ServerResponse.noContent().build();
            }
            return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(fromValue(gears));
        });
    }

    public Mono<ServerResponse> createGear(final ServerRequest serverRequest) {
        return gearService.createGear(serverRequest.pathVariable(NAME))
                .flatMap(organization -> ServerResponse.created(getURI(organization))
                        .bodyValue(organization));
    }

    public Mono<ServerResponse> getGear(final ServerRequest serverRequest) {
        return gearService.getGear(serverRequest.pathVariable(NAME))
                .flatMap(organization -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(organization))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    public Mono<ServerResponse> updateGear(final ServerRequest serverRequest) {
        return serverRequest.bodyToMono(Gear.class)
                .flatMap(gear -> gearService.updateGear(serverRequest.pathVariable(NAME), gear))
                .flatMap(gear -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(gear))
                        .switchIfEmpty(ServerResponse.notFound().build()));
    }

    private URI getURI(final Equipment equipment) {
        return UriComponentsBuilder.fromPath(("/{id}")).buildAndExpand(equipment.getName()).toUri();
    }
}
