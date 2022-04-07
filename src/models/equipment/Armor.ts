import Equipment from "./Equipment";

export default interface Armor extends Equipment {
    soak: number,
    defense: number,
}

export class DefaultArmor {
    static create(): Armor {
        return {
            id: '',
            name: '',
            encumbrance: 0,
            description: '',
            price: 0,
            soak: 0,
            defense: 0,
        }
    }
}