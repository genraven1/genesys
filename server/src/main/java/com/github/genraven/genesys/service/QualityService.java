package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.equipment.Quality;
import com.github.genraven.genesys.repository.QualityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class QualityService {

    private final QualityRepository qualityRepository;

    @Autowired
    public QualityService(final QualityRepository qualityRepository) {
        this.qualityRepository = qualityRepository;
    }

    public Flux<Quality> getAllQualities() {
        return qualityRepository.findAll();
    }

    public Mono<Quality> getQuality(final String name) {
        return qualityRepository.findById(name);
    }

    public Mono<Quality> createQuality(final String name) {
        return qualityRepository.save(new Quality(name));
    }

    public Mono<Quality> updateQuality(final String name, final Quality quality) {
        return getQuality(name).map(qual -> {
            qual.setDescription(quality.getDescription());
            qual.setCost(quality.getCost());
            qual.setWeapon(quality.isWeapon());
            qual.setArmor(quality.isArmor());
            qual.setModifiers(quality.getModifiers());
            return qual;
        }).flatMap(qualityRepository::save);
    }
}
