export default interface StatusEffect {
    type: Type
    rounds: number
}

enum Type {
    Disoriented = 'Disoriented',
    Immobilized = 'Immobilized',
    Staggered = 'Staggered'
}