import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField} from '@mui/material';
import GenesysDescriptionTypography from "../common/typography/GenesysDescriptionTypography";
import {GenesysSymbols} from "../../models/roll/GenesysSymbols";
import {Die} from "../../models/roll/dice/Die";
import {abilityDie} from "../../models/roll/dice/Ability";
import {boostDie} from "../../models/roll/dice/Boost";
import {proficiencyDie} from "../../models/roll/dice/Proficiency";
import {challengeDie} from "../../models/roll/dice/Challenge";
import {difficultyDie} from "../../models/roll/dice/Difficulty";

function rollDice(dice: Die[], customSymbols: GenesysSymbols[][]): GenesysSymbols[] {
    const results: GenesysSymbols[] = [];
    dice.forEach(die => {
        results.push(...die.roll());
    });
    customSymbols.forEach(symbols => {
        results.push(...symbols);
    });
    return results;
}

function tallyResults(results: GenesysSymbols[]): string {
    const tally: Record<GenesysSymbols, number> = {
        [GenesysSymbols.Success]: 0,
        [GenesysSymbols.Advantage]: 0,
        [GenesysSymbols.Triumph]: 0,
        [GenesysSymbols.Failure]: 0,
        [GenesysSymbols.Threat]: 0,
        [GenesysSymbols.Despair]: 0,
        [GenesysSymbols.Blank]: 0,
    };

    results.forEach(result => {
        tally[result]++;
    });

    const netSuccesses = tally[GenesysSymbols.Success] - tally[GenesysSymbols.Failure];
    tally[GenesysSymbols.Success] = Math.max(0, netSuccesses);
    tally[GenesysSymbols.Failure] = Math.max(0, -netSuccesses);

    const netAdvantages = tally[GenesysSymbols.Advantage] - tally[GenesysSymbols.Threat];
    tally[GenesysSymbols.Advantage] = Math.max(0, netAdvantages);
    tally[GenesysSymbols.Threat] = Math.max(0, -netAdvantages);

    tally[GenesysSymbols.Blank] = 0;
    return Object.entries(tally)
        .filter(([_, count]) => count > 0)
        .map(([symbol, count]) => `[${GenesysSymbols[symbol as unknown as GenesysSymbols]}] `.repeat(count))
        .join(' ');
}

interface Props {
    open: boolean
    onClose: () => void
}

export default function DiceRoller(props: Props) {
    const {open, onClose} = props;
    const [results, setResults] = useState<string | null>(null);
    const [boostDiceCount, setBoostDiceCount] = useState(0);
    const [abilityDiceCount, setAbilityDiceCount] = useState(0);
    const [difficultyDiceCount, setDifficultyDiceCount] = useState(0);
    const [proficiencyDiceCount, setProficiencyDiceCount] = useState(0);
    const [challengeDieCount, setChallengeDieCount] = useState(0);
    const [symbolCounts, setSymbolCounts] = useState({
        [GenesysSymbols.Success]: 0,
        [GenesysSymbols.Advantage]: 0,
        [GenesysSymbols.Triumph]: 0,
        [GenesysSymbols.Failure]: 0,
        [GenesysSymbols.Threat]: 0,
        [GenesysSymbols.Despair]: 0,
        [GenesysSymbols.Blank]: 0,
    });

    const handleClose = () => {
        setResults(null);
        onClose()
    };

    const handleSymbolChange = (symbol: GenesysSymbols) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        setSymbolCounts(prevCounts => ({
            ...prevCounts,
            [symbol]: value
        }));
    };

    const handleRoll = () => {
        const boostDice = Array(boostDiceCount).fill(boostDie);
        const abilityDice = Array(abilityDiceCount).fill(abilityDie);
        const difficultyDice = Array(abilityDiceCount).fill(difficultyDie);
        const proficiencyDice = Array(proficiencyDiceCount).fill(proficiencyDie);
        const challengeDice = Array(challengeDieCount).fill(challengeDie);
        const diceToRoll = [...boostDice, ...abilityDice, ...difficultyDice, ...proficiencyDice, ...challengeDice];
        const customSymbols = Object.entries(symbolCounts)
            .flatMap(([symbol, count]) => symbol !== GenesysSymbols.Blank.toString() ? Array(count)
                .fill([parseInt(symbol, 10)]) : []);
        const rolledResults = rollDice(diceToRoll, customSymbols);
        const tally = tallyResults(rolledResults);
        setResults(tally);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle style={{textAlign: 'center'}}>Genesys Dice Roller</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField margin="dense" label="Boost" type="number" fullWidth variant="outlined"
                                   value={boostDiceCount}
                                   onChange={(e) => setBoostDiceCount(parseInt(e.target.value))}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField margin="dense" label="Ability" type="number" fullWidth variant="outlined"
                                   value={abilityDiceCount}
                                   onChange={(e) => setAbilityDiceCount(parseInt(e.target.value))}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField margin="dense" label="Difficulty" type="number" fullWidth variant="outlined"
                                   value={difficultyDiceCount}
                                   onChange={(e) => setDifficultyDiceCount(parseInt(e.target.value))}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField margin="dense" label="Proficiency" type="number" fullWidth
                                   variant="outlined" value={proficiencyDiceCount}
                                   onChange={(e) => setProficiencyDiceCount(parseInt(e.target.value))}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField margin="dense" label="Challenge" type="number" fullWidth
                                   variant="outlined" value={challengeDieCount}
                                   onChange={(e) => setChallengeDieCount(parseInt(e.target.value))}/>
                    </Grid>
                </Grid> <Grid container spacing={2}>
                {Object.entries(GenesysSymbols).map(([key, value]) => (typeof value === 'number' && value !== GenesysSymbols.Blank && (
                    <Grid item xs={6} key={value}>
                        <TextField margin="dense" label={key} type="number" fullWidth
                                   variant="outlined" value={symbolCounts[value as GenesysSymbols]}
                                   onChange={handleSymbolChange(value as GenesysSymbols)}/>
                    </Grid>
                )))}
            </Grid>
                {results && (
                    <div>
                        <h4>Results:</h4>
                        <GenesysDescriptionTypography text={results}/>
                        <p>{results}</p>
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleRoll}>Roll</Button>
            </DialogActions>
        </Dialog>
    );
};
