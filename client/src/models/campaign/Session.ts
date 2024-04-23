import Party from "./Party";
import Scene from "./Scene";

export default interface Session {
    party: Party
    scenes: Scene[]
}