package com.github.genraven.genesys.controller;

import com.github.genraven.genesys.model.actor.Skill;
import com.github.genraven.genesys.service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping(value="/skills")
public class SkillController {

    private final SkillService skillService;

    @Autowired
    public SkillController(final SkillService skillService) {
        this.skillService = skillService;
    }

    @GetMapping("/")
    public ResponseEntity<List<Skill>> getSkills() {
        return ResponseEntity.ok(skillService.getSkills());
    }

    @PostMapping("/{name}")
    public ResponseEntity<Skill> createSkill(@PathVariable final String name) {
        return ResponseEntity.ok(skillService.createSkill(name));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Skill> getSkill(@PathVariable final Long id) {
        return ResponseEntity.ok(skillService.getSkill(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Skill> updateSkill(@PathVariable final Long id, @RequestBody final Skill setting) {
        return ResponseEntity.ok(skillService.updateSkill(id, setting));
    }
}
