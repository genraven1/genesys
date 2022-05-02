export default interface BaseEquipmentStats {
    id: string,
    name: string,
    encumbrance: number,
    description: string,
    price: string,
    rarity: number
}

export class DefaultEquipment {
    static create() {
        return {
            id: '',
            name: '',
            encumbrance: 0,
            description: '',
            price: '',
            rarity: 0
        }
    }
}