import {Die} from "./Die";
import {GenesysSymbols} from "../GenesysSymbols";

export const difficultyDie = new Die([
    [GenesysSymbols.Blank],
    [GenesysSymbols.Failure],
    [GenesysSymbols.Failure, GenesysSymbols.Failure],
    [GenesysSymbols.Threat],
    [GenesysSymbols.Threat],
    [GenesysSymbols.Threat],
    [GenesysSymbols.Threat, GenesysSymbols.Threat],
    [GenesysSymbols.Failure],
]);