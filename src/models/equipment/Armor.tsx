import Equipment from "./Equipment";

export default interface Armor extends Equipment {
    soak: number,
    defense: number,
}