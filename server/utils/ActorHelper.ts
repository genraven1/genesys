import Actor, { ActorType } from "../../client/src/models/actor/Actor";
import NonPlayerActor from "../../client/src/models/actor/npc/NonPlayerActor";
import Nemesis from '../../client/src/models/actor/npc/Nemesis.ts';

export const createDefaultCharacteristics = (actor: Actor) => {
    actor.brawn = 1;
    actor.agility = 1;
    actor.intellect = 1;
    actor.cunning = 1;
    actor.willpower = 1;
    actor.presence = 1;
};

export const createDefaultStats = (actor: Actor) => {
    actor.wounds = 1;
    actor.melee = 0;
    actor.ranged = 0;
};

export const createDefaultRatings = (npc: NonPlayerActor) => {
    npc.combat = 1;
    npc.social = 1;
    npc.general = 1;
};