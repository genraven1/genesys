import {Die} from "./Die";
import {GenesysSymbols} from "../GenesysSymbols";

export const proficiencyDie = new Die([
    [GenesysSymbols.Blank],
    [GenesysSymbols.Success],
    [GenesysSymbols.Success],
    [GenesysSymbols.Success, GenesysSymbols.Success],
    [GenesysSymbols.Success, GenesysSymbols.Success],
    [GenesysSymbols.Advantage],
    [GenesysSymbols.Success, GenesysSymbols.Advantage],
    [GenesysSymbols.Success, GenesysSymbols.Advantage],
    [GenesysSymbols.Success, GenesysSymbols.Advantage],
    [GenesysSymbols.Advantage, GenesysSymbols.Advantage],
    [GenesysSymbols.Advantage, GenesysSymbols.Advantage],
    [GenesysSymbols.Success, GenesysSymbols.Triumph],
]);