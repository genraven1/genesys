export default interface Talent {
    name: string,
    ranked: boolean,
    activation: string,
    tier: number,
    description: string,
    id: string,
    experience: number
}

export interface ActorTalent extends Talent {
    ranks: number
}

export class DefaultTalent {
    static create(): Talent {
        return {
            name: '',
            ranked: false,
            activation: '',
            tier: 1,
            description: '',
            id: '',
            experience: 5
        };
    }
}