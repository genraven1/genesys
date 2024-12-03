package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.actor.npc.Nemesis;
import com.github.genraven.genesys.domain.actor.npc.Rival;
import com.github.genraven.genesys.domain.campaign.Campaign;
import com.github.genraven.genesys.domain.campaign.Scene;
import com.github.genraven.genesys.repository.CampaignRepository;
import com.github.genraven.genesys.repository.SceneRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SceneService {

    private final SceneRepository sceneRepository;
    private final CampaignRepository campaignRepository;

    public Flux<Scene> getAllScenes() {
        return sceneRepository.findAll();
    }

    public Mono<Scene> getScene(final String name) {
        return sceneRepository.findById(name);
    }

    public Mono<Scene> createScene(final String name) {
        return sceneRepository.save(new Scene(name));
    }

    public Mono<Scene> updateScene(final String name, final Scene updatedScene) {
        return getScene(name).map(scene -> {
            scene.setName(updatedScene.getName());
            scene.setParty(updatedScene.getParty());
            return scene;
        }).flatMap(sceneRepository::save);
    }

    public Mono<List<Scene>> getScenesForCurrentCampaign() {
        return campaignRepository.findByCurrent(true)
                .flatMap(campaign -> Flux.fromIterable(campaign.getSceneIds())
                        .flatMap(sceneRepository::findById)
                        .collectList());
    }

    public Mono<Campaign> addSceneToCurrentCampaign(final String sceneId) {
        return campaignRepository.findByCurrent(true).flatMap(existingCampaign -> {
            existingCampaign.getSkillIds().add(sceneId);
            return campaignRepository.save(existingCampaign);
        });
    }

    public Mono<List<Rival>> getEnemyRivals(final String id) {
        return getScene(id).flatMap(scene -> Flux.fromIterable(scene.getEnemyRivals()).collectList());
    }

    public Mono<Scene> addEnemyRivalToScene(final String sceneId, final Rival rival) {
        return getScene(sceneId).flatMap(existingScene -> {
            existingScene.getEnemyRivals().add(rival);
            return sceneRepository.save(existingScene);
        });
    }

    public Mono<List<Nemesis>> getEnemyNemeses(final String id) {
        return getScene(id).flatMap(scene -> Flux.fromIterable(scene.getEnemyNemeses()).collectList());
    }

    public Mono<Scene> addEnemyNemesisToScene(final String sceneId, final Nemesis nemesis) {
        return getScene(sceneId).flatMap(existingScene -> {
            existingScene.getEnemyNemeses().add(nemesis);
            return sceneRepository.save(existingScene);
        });
    }
}
