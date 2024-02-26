package com.github.genraven.gradlejavaserver.repository.lore;

import com.github.genraven.gradlejavaserver.domain.lore.Organization;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrganizationRepository extends ReactiveMongoRepository<Organization, String> {
}
