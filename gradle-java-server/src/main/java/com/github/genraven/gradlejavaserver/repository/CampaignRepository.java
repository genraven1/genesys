package com.github.genraven.gradlejavaserver.repository;

import com.github.genraven.gradlejavaserver.domain.campaign.Campaign;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CampaignRepository extends ReactiveMongoRepository<Campaign, String> {
}
