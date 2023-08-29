package com.github.genraven.genesys.service;

import com.github.genraven.genesys.repository.NemesisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NemesisService {

    private final NemesisRepository nemesisRepository;

    @Autowired
    public NemesisService(final NemesisRepository nemesisRepository) {
        this.nemesisRepository = nemesisRepository;
    }
}
