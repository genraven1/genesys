export default interface EquipmentStats {
    encumbrance: number,
    rarity: number
}

export class DefaultEquipment {
    static create() {
        return {
            encumbrance: 0,
            rarity: 0
        }
    }
}