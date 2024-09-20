package com.github.genraven.genesys.repository;

import com.github.genraven.genesys.domain.spell.Spell;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpellRepository extends ReactiveMongoRepository<Spell, String> {
}
