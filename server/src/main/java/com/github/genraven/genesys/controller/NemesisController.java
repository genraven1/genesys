package com.github.genraven.genesys.controller;

import com.github.genraven.genesys.model.actor.Nemesis;
import com.github.genraven.genesys.service.NemesisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping(value="/actor/nemesis")
public class NemesisController {

    private final NemesisService nemesisService;

    @Autowired
    public NemesisController(final NemesisService nemesisService) {
        this.nemesisService = nemesisService;
    }

    @GetMapping("/")
    public ResponseEntity<List<Nemesis>> getNemeses() {
        return ResponseEntity.ok(nemesisService.getNemeses());
    }

    @PostMapping("/{name}")
    public ResponseEntity<Nemesis> createNemesis(@PathVariable final String name) {
        return ResponseEntity.ok(nemesisService.createNemesis(name));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Nemesis> getNemesis(@PathVariable final Long id) {
        return ResponseEntity.ok(nemesisService.getNemesis(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Nemesis> updateNemesis(@PathVariable final Long id, @RequestBody final Nemesis nemesis) {
        return ResponseEntity.ok(nemesisService.updateNemesis(id, nemesis));
    }
}

//static async updateNemesisSkill(id: number, skill: ActorSkill): Promise<Nemesis> {
//        return await (await axios.put(ActorPath.Nemesis + id + '/skills', skill)).data;
//        }
//
//static async addNemesisTalent(id: number, talent: ActorNemesis): Promise<Nemesis> {
//        return await (await axios.put(ActorPath.Nemesis + id + '/talents', talent)).data;
//        }
//
//static async createNemesisWeapon(id: number, weapon: ActorWeapon): Promise<Nemesis> {
//        return await (await axios.post(ActorPath.Nemesis + id + '/weapons', weapon)).data;
//        }
//
//static async createNemesisArmor(id: number, armor: ActorArmor): Promise<Nemesis> {
//        return await (await axios.post(ActorPath.Nemesis + id + '/armor', armor)).data;
//        }
//
//static async createNemesisAbility(id: number, ability: Ability): Promise<Nemesis> {
//        return await (await axios.post(ActorPath.Nemesis + id + '/ability', ability)).data;
//        }