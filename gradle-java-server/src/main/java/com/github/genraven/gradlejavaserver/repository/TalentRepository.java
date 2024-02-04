package com.github.genraven.gradlejavaserver.repository;

import com.github.genraven.gradlejavaserver.domain.Talent;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TalentRepository extends ReactiveMongoRepository<Talent, String> {
}
