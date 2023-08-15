package com.github.genraven.genesys.controller;

import com.github.genraven.genesys.model.roll.Roll;
import com.github.genraven.genesys.model.roll.RollResults;
import com.github.genraven.genesys.service.RollService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping(value="/roll")
public class RollController {

    private final RollService rollService;

    public RollController(final RollService rollService) {
        this.rollService = rollService;
    }

    @PostMapping
    public ResponseEntity<RollResults> getRollResults(final Roll roll) {
        return ResponseEntity.ok(rollService.getResults(roll));
    }
}
