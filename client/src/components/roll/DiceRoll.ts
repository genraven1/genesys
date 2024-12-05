import {Die} from "../../models/roll/dice/Die";
import {GenesysSymbols} from "../../models/roll/GenesysSymbols";
import {boostDie} from "../../models/roll/dice/Boost";
import {setbackDie} from "../../models/roll/dice/Setback";
import {abilityDie} from "../../models/roll/dice/Ability";
import {difficultyDie} from "../../models/roll/dice/Difficulty";
import {proficiencyDie} from "../../models/roll/dice/Proficiency";
import {challengeDie} from "../../models/roll/dice/Challenge";

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
    boost: number
    setback: number
    ability: number
    difficulty: number
    proficiency: number
    challenge: number
    symbols: Record<GenesysSymbols, number>
}

export default function handleDiceRoll(props: Props) {
    const {boost, setback, ability, difficulty, proficiency, challenge, symbols} = props;
    const diceToRoll = [
        ...Array(boost).fill(boostDie),
        ...Array(setback).fill(setbackDie),
        ...Array(ability).fill(abilityDie),
        ...Array(difficulty).fill(difficultyDie),
        ...Array(proficiency).fill(proficiencyDie),
        ...Array(challenge).fill(challengeDie)
    ];
    const customSymbols = Object.entries(symbols)
        .flatMap(([symbol, count]) => symbol !== GenesysSymbols.Blank.toString() ? Array(count)
            .fill([parseInt(symbol, 10)]) : []);
    const rolledResults = rollDice(diceToRoll, customSymbols);
    return tallyResults(rolledResults);
}