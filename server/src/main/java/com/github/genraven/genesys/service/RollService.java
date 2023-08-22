package com.github.genraven.genesys.service;

import com.github.genraven.genesys.model.roll.Roll;
import com.github.genraven.genesys.model.roll.RollResults;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class RollService {

    public RollResults getResults(final Roll roll) {
        final RollResults results = setInitialRollResults(roll);
        results.addResults(getBoostResults(roll.getBoost()));
        results.addResults(getAbilityResults(roll.getAbility()));
        results.addResults(getProficiencyResults(roll.getProficiency()));
        results.addResults(getSetbackResults(roll.getSetback()));
        results.addResults(getDifficultyResults(roll.getDifficulty()));
        results.addResults(getChallengeResults(roll.getChallenge()));
        return resolveRollResults(results);
    }

    private RollResults setInitialRollResults(final Roll roll) {
        final RollResults results = new RollResults();
        results.setSuccess(roll.getSuccess());
        results.setAdvantage(roll.getAdvantage());
        results.setTriumph(roll.getTriumph());
        results.setFailure(roll.getFailure());
        results.setThreat(roll.getThreat());
        results.setDespair(roll.getDespair());
        return results;
    }

    private int rollDie(final int sides) {
        return new Random().nextInt(sides) + 1;
    }

    private RollResults getBoostResults(final int dice) {
        final RollResults results = new RollResults();
        for (int i = 0; i < dice; i++) {
            final int side = rollDie(6);
            switch (side) {
                case 1, 2 -> {
                }
                case 3 -> results.addSuccess(1);
                case 4 -> {
                    results.addSuccess(1);
                    results.addAdvantages(1);
                }
                case 5 -> results.addAdvantages(2);
                case 6 -> results.addAdvantages(1);
                default -> throw new IllegalStateException("Unexpected value: " + side);
            }
        }
        return results;
    }

    private RollResults getAbilityResults(final int dice) {
        final RollResults results = new RollResults();
        for (int i = 0; i < dice; i++) {
            final int side = rollDie(8);
            switch (side) {
                case 1 -> {
                }
                case 2, 3 -> results.addSuccess(1);
                case 4 -> results.addSuccess(2);
                case 5, 6 -> results.addAdvantages(1);
                case 7 -> {
                    results.addSuccess(1);
                    results.addAdvantages(1);
                }
                case 8 -> results.addAdvantages(2);
                default -> throw new IllegalStateException("Unexpected value: " + side);
            }
        }
        return results;
    }

    private RollResults getProficiencyResults(final int dice) {
        final RollResults results = new RollResults();
        for (int i = 0; i < dice; i++) {
            final int side = rollDie(12);
            switch (side) {
                case 1 -> {
                }
                case 2, 3 -> results.addSuccess(1);
                case 4, 5 -> results.addSuccess(2);
                case 6 -> results.addAdvantages(1);
                case 7, 8, 9 -> {
                    results.addSuccess(1);
                    results.addAdvantages(1);
                }
                case 10, 11 -> results.addAdvantages(2);
                case 12 -> {
                    results.addSuccess(1);
                    results.addTriumphs(1);
                }
                default -> throw new IllegalStateException("Unexpected value: " + side);
            }
        }
        return results;
    }

    private RollResults getSetbackResults(final int dice) {
        final RollResults results = new RollResults();
        for (int i = 0; i < dice; i++) {
            final int side = rollDie(6);
            switch (side) {
                case 1, 2 -> {
                }
                case 3, 4 -> results.addFailures(1);
                case 5, 6 -> results.addThreats(1);
                default -> throw new IllegalStateException("Unexpected value: " + side);
            }
        }
        return results;
    }

    private RollResults getDifficultyResults(final int dice) {
        final RollResults results = new RollResults();
        for (int i = 0; i < dice; i++) {
            final int side = rollDie(8);
            switch (side) {
                case 1 -> {
                }
                case 2, 8 -> results.addFailures(1);
                case 3 -> results.addFailures(2);
                case 4, 5, 6 -> results.addThreats(1);
                case 7 -> {
                    results.addSuccess(1);
                    results.addAdvantages(1);
                }
                default -> throw new IllegalStateException("Unexpected value: " + side);
            }
        }
        return results;
    }

    private RollResults getChallengeResults(final int dice) {
        final RollResults results = new RollResults();
        for (int i = 0; i < dice; i++) {
            final int side = rollDie(12);
            switch (side) {
                case 1 -> {
                }
                case 2, 3 -> results.addFailures(1);
                case 4, 5 -> results.addFailures(2);
                case 6, 7 -> results.addThreats(1);
                case 8, 9 -> {
                    results.addFailures(1);
                    results.addThreats(1);
                }
                case 10, 11 -> results.addThreats(2);
                case 12 -> {
                    results.addFailures(1);
                    results.addDespairs(1);
                }
                default -> throw new IllegalStateException("Unexpected value: " + side);
            }
        }
        return results;
    }

    private RollResults resolveRollResults(final RollResults results) {
        resolveSuccessAndFailure(results);
        resolveAdvantageAndThreat(results);
        return results;
    }

    private void resolveSuccessAndFailure(final RollResults results) {
        if (results.getSuccess() == results.getFailure()) {
            results.setSuccess(0);
            results.setFailure(0);
        }
        else if (results.getSuccess() > results.getFailure()) {
            results.setSuccess(results.getSuccess() - results.getFailure());
            results.setFailure(0);
        }
        else {
            results.setFailure(results.getFailure() - results.getSuccess());
            results.setSuccess(0);
        }
    }

    private void resolveAdvantageAndThreat(final RollResults results) {
        if (results.getAdvantage() == results.getThreat()) {
            results.setAdvantage(0);
            results.setThreat(0);
        }
        else if (results.getAdvantage() > results.getThreat()) {
            results.setAdvantage(results.getAdvantage() - results.getThreat());
            results.setThreat(0);
        }
        else {
            results.setThreat(results.getThreat() - results.getAdvantage());
            results.setAdvantage(0);
        }
    }
}
