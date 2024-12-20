import {GenesysSymbols} from "./GenesysSymbols";
import {rollDice, tallyResults} from "./DiceRoll";
import { Die } from "./dice/Die";

interface Props {
    dice: Die[]
    symbols: Record<GenesysSymbols, number>
}

export default function handleDicePoolRoll(props: Props) {
    const {dice, symbols} = props;
    const customSymbols = Object.entries(symbols)
        .flatMap(([symbol, count]) => symbol !== GenesysSymbols.Blank.toString() ? Array(count)
            .fill([parseInt(symbol, 10)]) : []);
    const rolledResults = rollDice(dice, customSymbols);
    return tallyResults(rolledResults);
}