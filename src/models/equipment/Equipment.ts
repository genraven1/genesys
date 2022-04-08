export default interface Equipment {
    id: string,
    name: string,
    encumbrance: number,
    description: string,
    price: number,
    rarity: number
}

export class DefaultEquipment {
    static create() {
        return {
            id: '',
            name: '',
            encumbrance: 0,
            description: '',
            price: 0,
            rarity: 0
        }
    }
}