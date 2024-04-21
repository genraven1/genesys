import Actor from "../actor/Actor";

export default interface Scene {
    id: number
    name: string
    actors: Actor[]
    party: Actor[]
}