package com.github.genraven.genesys.service;

import com.github.genraven.genesys.model.actor.equipment.Quality;
import com.github.genraven.genesys.repository.QualityRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QualityService {
    private final QualityRepository qualityRepository;

    public QualityService(final QualityRepository qualityRepository) {
        this.qualityRepository = qualityRepository;
    }

    public Quality createQuality(final String name) {
        return qualityRepository.save(new Quality(name));
    }

    public Quality updateQuality(final Long id, final Quality quality) {
        return qualityRepository.save(quality);
    }

    public Quality getQuality(final Long id) {
        return qualityRepository.findById(id).orElse(new Quality(""));
    }

    public List<Quality> getQualities() {
        return qualityRepository.findAll();
    }

    public List<String> getQualityNames() {
        return getQualities().stream().map(Quality::getName).collect(Collectors.toList());
    }

    public List<String> getWeaponQualityNames() {
        return getQualities().stream().filter(Quality::isWeapon).map(Quality::getName).collect(Collectors.toList());
    }

    public List<String> getArmorQualityNames() {
        return getQualities().stream().filter(Quality::isArmor).map(Quality::getName).collect(Collectors.toList());
    }
}
