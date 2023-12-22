package com.github.genraven.genesys.repository;

import com.github.genraven.genesys.domain.Talent;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TalentRepository extends ReactiveMongoRepository<Talent, Long> {
}
