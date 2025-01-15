import Party from "../Party";
import {MinionGroup} from "../../actor/npc/Minion";
import Rival from "../../actor/npc/Rival";
import Nemesis from "../../actor/npc/Nemesis";

export default interface Encounter {
    type: Type
    party: Party
    minions: MinionGroup[]
    rivals: Rival[]
    nemeses: Nemesis[]
}

export enum Type {
    Combat = 'Combat',
    Social = 'Social',
}