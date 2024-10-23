import Player from "../actor/player/Player";
import NonPlayerActor from "../actor/npc/NonPlayerActor";

export default interface Party {
    party_id: number
    players: Player[]
    npcs: NonPlayerActor[]
}