import {Die} from "./Die";
import {GenesysSymbols} from "../GenesysSymbols";

export const boostDie = new Die([
    [GenesysSymbols.Blank],
    [GenesysSymbols.Blank],
    [GenesysSymbols.Success],
    [GenesysSymbols.Success, GenesysSymbols.Advantage],
    [GenesysSymbols.Advantage, GenesysSymbols.Advantage],
    [GenesysSymbols.Advantage],
]);