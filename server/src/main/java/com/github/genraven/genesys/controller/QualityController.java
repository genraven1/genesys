package com.github.genraven.genesys.controller;

import com.github.genraven.genesys.model.actor.equipment.Quality;
import com.github.genraven.genesys.service.QualityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping(value="/qualities")
public class QualityController {
    private final QualityService qualityService;

    @Autowired
    public QualityController(final QualityService qualityService) {
        this.qualityService = qualityService;
    }

    @GetMapping("/")
    public ResponseEntity<List<Quality>> getQualities() {
        return ResponseEntity.ok(qualityService.getQualities());
    }

    @PostMapping("/{name}")
    public ResponseEntity<Quality> createQuality(@PathVariable final String name) {
        return ResponseEntity.ok(qualityService.createQuality(name));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quality> getQuality(@PathVariable final Long id) {
        return ResponseEntity.ok(qualityService.getQuality(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Quality> updateQuality(@PathVariable final Long id, @RequestBody final Quality quality) {
        return ResponseEntity.ok(qualityService.updateQuality(id, quality));
    }
}
