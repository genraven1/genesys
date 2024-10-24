package com.github.genraven.genesys.repository;

import com.github.genraven.genesys.domain.CriticalInjury;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InjuryRepository extends ReactiveMongoRepository<CriticalInjury, String> {
}
