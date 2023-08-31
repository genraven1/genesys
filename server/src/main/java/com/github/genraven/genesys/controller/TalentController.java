package com.github.genraven.genesys.controller;

import com.github.genraven.genesys.model.actor.Talent;
import com.github.genraven.genesys.service.TalentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping(value="/talents")
public class TalentController {
    private final TalentService talentService;

    @Autowired
    public TalentController(final TalentService talentService) {
        this.talentService = talentService;
    }

    @GetMapping("/")
    public ResponseEntity<List<Talent>> getTalents() {
        return ResponseEntity.ok(talentService.getTalents());
    }

    @PostMapping("/{name}")
    public ResponseEntity<Talent> createTalent(@PathVariable final String name) {
        return ResponseEntity.ok(talentService.createTalent(name));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Talent> getTalent(@PathVariable final Long id) {
        return ResponseEntity.ok(talentService.getTalent(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Talent> updateTalent(@PathVariable final Long id, @RequestBody final Talent talent) {
        return ResponseEntity.ok(talentService.updateTalent(id, talent));
    }
}
