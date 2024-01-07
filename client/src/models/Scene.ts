import Actor from "./actor/Actor";

export default interface Scene {
    id: number
    actors: Actor[]
}