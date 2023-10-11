import NonPlayerActor from "./NonPlayerActor.ts";

export default interface Minion extends NonPlayerActor {
    group: string[]
}