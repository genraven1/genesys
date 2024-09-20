package com.github.genraven.gradlejavaserver.repository.campaign;

import com.github.genraven.gradlejavaserver.domain.campaign.Party;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PartyRepository extends ReactiveMongoRepository<Party, String> {
}
