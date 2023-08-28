package com.github.genraven.genesys.model.roll;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RollResults {
    private int success;

    private int advantage;

    private int triumph;

    private int failure;

    private int threat;

    private int despair;

    public void addSuccess(final int amount) {
        this.success += amount;
    }

    public void addAdvantages(final int amount) {
        this.advantage += amount;
    }

    public void addTriumphs(final int amount) {
        this.triumph += amount;
    }

    public void addFailures(final int amount) {
        this.failure += amount;
    }

    public void addThreats(final int amount) {
        this.threat += amount;
    }

    public void addDespairs(final int amount) {
        this.despair += amount;
    }

    public void addResults(final RollResults results) {
        this.success += results.getSuccess();
        this.advantage += results.getAdvantage();
        this.triumph += results.getTriumph();
        this.failure += results.getFailure();
        this.threat += results.getThreat();
        this.despair += results.getDespair();
    }
}
