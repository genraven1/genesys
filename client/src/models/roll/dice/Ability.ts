import {Die} from "./Die";
import {GenesysSymbols} from "../GenesysSymbols";

export const abilityDie = new Die([
    [GenesysSymbols.Blank],
    [GenesysSymbols.Success],
    [GenesysSymbols.Success],
    [GenesysSymbols.Success, GenesysSymbols.Success],
    [GenesysSymbols.Advantage],
    [GenesysSymbols.Advantage],
    [GenesysSymbols.Success, GenesysSymbols.Advantage],
    [GenesysSymbols.Advantage, GenesysSymbols.Advantage],
]);