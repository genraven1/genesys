package com.github.genraven.gradlejavaserver.repository;

import com.github.genraven.gradlejavaserver.domain.spell.Spell;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpellRepository extends ReactiveMongoRepository<Spell, String> {
}
