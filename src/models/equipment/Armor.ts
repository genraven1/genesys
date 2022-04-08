export default interface Armor {
    soak: number,
    defense: number,
    id: string,
    name: string,
    encumbrance: number,
    description: string,
    price: number,
    rarity: number
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
            rarity: 0
        }
    }
}