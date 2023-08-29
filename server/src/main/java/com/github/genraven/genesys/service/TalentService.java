package com.github.genraven.genesys.service;

import com.github.genraven.genesys.model.actor.talent.Talent;
import com.github.genraven.genesys.repository.TalentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TalentService {
    private final TalentRepository talentRepository;

    public TalentService(final TalentRepository talentRepository) {
        this.talentRepository = talentRepository;
    }

    public Talent createTalent(final String name) {
        return talentRepository.save(new Talent(name));
    }

    public Talent updateTalent(final Long id, final Talent talent) {
        return talentRepository.save(talent);
    }

    public Talent getTalent(final Long id) {
        return talentRepository.findById(id).orElse(new Talent(""));
    }

    public List<Talent> getTalents() {
        return talentRepository.findAll();
    }

    public List<String> getTalentNames() {
        return getTalents().stream().map(Talent::getName).collect(Collectors.toList());
    }
}
