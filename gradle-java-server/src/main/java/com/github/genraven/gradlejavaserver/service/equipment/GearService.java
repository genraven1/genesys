package com.github.genraven.gradlejavaserver.service.equipment;

import com.github.genraven.gradlejavaserver.domain.equipment.Equipment;
import com.github.genraven.gradlejavaserver.domain.equipment.Gear;
import com.github.genraven.gradlejavaserver.repository.equipment.GearRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class GearService {

    private final GearRepository gearRepository;

    @Autowired
    public GearService(final GearRepository gearRepository) {
        this.gearRepository = gearRepository;
    }

    public Flux<Gear> getAllGears() {
        return gearRepository.findAll();
    }

    public Mono<Gear> getGear(final String name) {
        return gearRepository.findById(name);
    }

    public Mono<Gear> createGear(final String name) {
        return gearRepository.save(new Gear(new Equipment(name)));
    }

    public Mono<Gear> updateGear(final String name, final Gear gear) {
        return getGear(name).map(ge -> {
            ge.setQualities(gear.getQualities());
            ge.setEncumbrance(gear.getEncumbrance());
            ge.setRarity(gear.getRarity());
            ge.setPrice(gear.getPrice());
            ge.setRestricted(gear.isRestricted());
            ge.setRange(gear.getRange());
            ge.setAmount(gear.getAmount());
            ge.setDescription(gear.getDescription());
            ge.setSettings(gear.getSettings());
            ge.setModifiers(gear.getModifiers());
            return ge;
        }).flatMap(gearRepository::save);
    }
}
