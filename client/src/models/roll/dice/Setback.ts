import {Die} from "./Die";
import {GenesysSymbols} from "../GenesysSymbols";

export const setbackDie = new Die([
    [GenesysSymbols.Blank],
    [GenesysSymbols.Blank],
    [GenesysSymbols.Failure],
    [GenesysSymbols.Failure],
    [GenesysSymbols.Threat],
    [GenesysSymbols.Threat],
]);