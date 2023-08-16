package com.github.genraven.genesys.controller;

import com.github.genraven.genesys.model.roll.Roll;
import com.github.genraven.genesys.model.roll.RollResults;
import com.github.genraven.genesys.service.RollService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping(value="/roll")
public class RollController {

    private final RollService rollService;

    @Autowired
    public RollController(final RollService rollService) {
        this.rollService = rollService;
    }

    @PostMapping
    public ResponseEntity<RollResults> getRollResults(@RequestBody final Roll roll) {
        return ResponseEntity.ok(rollService.getResults(roll));
    }
}
