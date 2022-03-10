export default interface Talent {
    name: string,
    ranked: string,
    activation: string,
    tier: string,
    description: string,
    id: string
}

export interface ActorTalent {
    ranks: number
}

export class DefaultTalent {
    static create(): Talent {
        return {
            name: '',
            ranked: '',
            activation: '',
            tier: '',
            description: '',
            id: '',
        };
    }
}