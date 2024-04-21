import Party from "./Party";
import Scene from "./Scene";

export default interface Session {
    name: string
    party: Party
    scenes: Scene[]
}