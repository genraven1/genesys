package com.github.genraven.genesys.service;

import com.github.genraven.genesys.domain.Talent;
import com.github.genraven.genesys.domain.campaign.Campaign;
import com.github.genraven.genesys.domain.campaign.Scene;
import com.github.genraven.genesys.domain.campaign.Session;
import com.github.genraven.genesys.domain.skill.Skill;
import com.github.genraven.genesys.repository.CampaignRepository;
import com.github.genraven.genesys.repository.SkillRepository;
import com.github.genraven.genesys.repository.TalentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
public class CampaignService {

    private final CampaignRepository campaignRepository;
    private final TalentRepository talentRepository;
    private final SkillRepository skillRepository;

    @Autowired
    public CampaignService(final CampaignRepository campaignRepository, final TalentRepository talentRepository, final SkillRepository skillRepository) {
        this.campaignRepository = campaignRepository;
        this.talentRepository = talentRepository;
        this.skillRepository = skillRepository;
    }

    public Flux<Campaign> getAllCampaigns() {
        return campaignRepository.findAll();
    }

    public Mono<Campaign> getCampaign(final String name) {
        return campaignRepository.findById(name);
    }

    public Mono<Campaign> createCampaign(final Campaign campaign) {
        return campaignRepository.save(campaign);
    }

    public Mono<Campaign> updateCampaign(final String name, final Campaign campaign) {
        return getCampaign(name).map(camp -> {
            camp.setName(campaign.getName());
            camp.setParty(campaign.getParty());
            camp.setSessions(campaign.getSessions());
            return camp;
        }).flatMap(campaignRepository::save);
    }

    public Mono<Campaign> getCurrentCampaign() {
        return campaignRepository.findByCurrent(true);
    }

    public Mono<Campaign> setCurrentCampaign(final String name) {
        return getCampaign(name).map(campaign -> {
            campaign.setCurrent(true);
            return campaign;
        }).flatMap(campaignRepository::save);
    }

    public Mono<Campaign> addTalentToCampaign(final String campaignId, final String talentId) {
        return campaignRepository.findById(campaignId)
                .flatMap(existingCampaign -> {
                    existingCampaign.getTalentIds().add(talentId);
                    return campaignRepository.save(existingCampaign);
                });
    }

    public Mono<List<Talent>> getTalentsByCampaignId(final String campaignId) {
        return campaignRepository.findById(campaignId)
                .flatMap(campaign -> Flux.fromIterable(campaign.getTalentIds())
                        .flatMap(talentRepository::findById)
                        .collectList());
    }

    public Mono<Campaign> addSkillToCampaign(final String campaignId, final String skillId) {
        return campaignRepository.findById(campaignId)
                .flatMap(existingCampaign -> {
                    existingCampaign.getSkillIds().add(skillId);
                    return campaignRepository.save(existingCampaign);
                });
    }

    public Mono<List<Skill>> getSkillsByCampaignId(final String campaignId) {
        return campaignRepository.findById(campaignId)
                .flatMap(campaign -> Flux.fromIterable(campaign.getSkillIds())
                        .flatMap(skillRepository::findById)
                        .collectList());
    }

    public Mono<Session> createSession(final String campaignName, final String sessionName) {
        getCampaign(campaignName).map(campaign -> {
            final Session session = new Session(sessionName);
            final List<Session> sessions = campaign.getSessions();
            sessions.add(session);
            campaign.setSessions(sessions);
            return campaign;
        }).flatMap(campaignRepository::save);
        return getSession(campaignName, sessionName);
    }

    public Mono<Session> getSession(final String campaignName, final String sessionName) {
        return getCampaign(campaignName)
                .map(campaign -> campaign.getSessions().stream()
                        .filter(session -> session.getName().equals(sessionName))
                        .findFirst().orElseThrow(ArrayIndexOutOfBoundsException::new));
    }

    public Mono<Session> updateSession(final String campaignName, final String sessionName, final Session session) {
        getCampaign(campaignName).map(campaign -> {
            campaign.getSessions().stream()
                    .filter(ses -> ses.getName().equals(sessionName)).forEach(ses -> {
                        ses.setScenes(session.getScenes());
                        ses.setParty(session.getParty());
                    });
            return campaign;
        }).flatMap(campaignRepository::save);
        return getSession(campaignName, sessionName);
    }

    public Mono<Scene> createScene(final String campaignName, final String sessionName, final String sceneName) {
        getCampaign(campaignName).map(campaign -> {
            campaign.getSessions().stream().filter(session -> session.getName().equals(sessionName)).forEach(session -> {
                final Scene scene = new Scene(sceneName);
                final List<Scene> scenes = session.getScenes();
                scenes.add(scene);
                session.setScenes(scenes);
            });
            return campaign;
        }).flatMap(campaignRepository::save);
        return getScene(campaignName, sessionName, sceneName);
    }

    public Mono<Scene> getScene(final String campaignName, final String sessionName, final String sceneName) {
        return getCampaign(campaignName)
                .map(campaign -> campaign.getSessions().stream()
                        .filter(session -> session.getName().equals(sessionName))
                        .map(session -> session.getScenes().stream()
                                .filter(scene -> scene.getName().equals(sceneName))
                                .findFirst().orElseThrow(ArrayIndexOutOfBoundsException::new))
                        .findFirst().orElseThrow(ArrayIndexOutOfBoundsException::new));
    }
}
