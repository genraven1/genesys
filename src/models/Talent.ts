export default interface Talent {
    name: string,
    ranked: string,
    activation: string,
    tier: string,
    description: string,
    id: string,
    experienceCost: number
}

export interface ActorTalent extends Talent {
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
            experienceCost: 5
        };
    }
}