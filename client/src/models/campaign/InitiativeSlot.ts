import {GenesysSymbols} from "../roll/GenesysSymbols";
import Character from "../actor/Character";

export default interface InitiativeSlot {
    type: Type
    results: Record<GenesysSymbols, number>
    character: Character
}

export enum Type {
    Player = 'Player',
    NPC = 'NPC'
}