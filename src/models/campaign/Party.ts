import Character from "../character/Character";

export default interface Party {
    party_id: number
    characters: Character[]
}