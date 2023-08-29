package com.github.genraven.genesys.controller;

import com.github.genraven.genesys.service.NemesisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping(value="/actor/nemesis")
public class NemesisController {

    private final NemesisService nemesisService;

    @Autowired
    public NemesisController(final NemesisService nemesisService) {
        this.nemesisService = nemesisService;
    }
}

//    static async createNemesis(name: string): Promise<Nemesis> {
//        return await (await axios.post( ActorPath.Nemesis + name)).data;
//        }
//
//static async getNemesis(id: number): Promise<Nemesis> {
//        return await (await axios.get(ActorPath.Nemesis + id)).data;
//        }
//
//static async getNemeses(): Promise<Nemesis[]> {
//        return await (await axios.get(ActorPath.Nemesis)).data;
//        }
//
//static async updateNemesis(id: number, nemesis: Nemesis): Promise<Nemesis> {
//        return await (await axios.put(ActorPath.Nemesis + id, nemesis)).data;
//        }
//
//static async updateNemesisSkill(id: number, skill: ActorSkill): Promise<Nemesis> {
//        return await (await axios.put(ActorPath.Nemesis + id + '/skills', skill)).data;
//        }
//
//static async addNemesisTalent(id: number, talent: ActorTalent): Promise<Nemesis> {
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