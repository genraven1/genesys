import {GenesysSymbols} from "../roll/GenesysSymbols";

export default interface InitiativeSlot {
    type: Type
    results: Record<GenesysSymbols, number>
}

export enum Type {
    Player = 'Player',
    NPC = 'NPC'
}