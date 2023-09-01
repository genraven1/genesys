package com.github.genraven.genesys.service;

import com.github.genraven.genesys.model.actor.equipment.Quality;
import com.github.genraven.genesys.repository.QualityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
