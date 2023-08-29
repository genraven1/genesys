package com.github.genraven.genesys.service;

import com.github.genraven.genesys.model.actor.Nemesis;
import com.github.genraven.genesys.repository.NemesisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NemesisService {

    private final NemesisRepository nemesisRepository;

    @Autowired
    public NemesisService(final NemesisRepository nemesisRepository) {
        this.nemesisRepository = nemesisRepository;
    }

    public Nemesis createNemesis(final String name) {
        return nemesisRepository.save(new Nemesis(name));
    }

    public Nemesis updateNemesis(final Long id, final Nemesis nemesis) {
        return nemesisRepository.save(nemesis);
    }

    public Nemesis getNemesis(final Long id) {
        return nemesisRepository.findById(id).orElse(new Nemesis(""));
    }

    public List<Nemesis> getNemeses() {
        return nemesisRepository.findAll();
    }
}
