import Actor from "../Actor";
import Stats from "../Stats";

export default interface Player extends Actor {
    strain: Stats
}