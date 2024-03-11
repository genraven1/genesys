package com.github.genraven.gradlejavaserver.repository;

import com.github.genraven.gradlejavaserver.domain.CriticalInjury;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InjuryRepository extends ReactiveMongoRepository<CriticalInjury, String> {
}
