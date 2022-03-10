import Actor from "./Actor";

export default interface NonPlayerCharacter extends Actor {
    combatRating: number,
    socialRating: number,
    generalRating: number,
}