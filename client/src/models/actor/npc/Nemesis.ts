import {SingleNonPlayerCharacter} from "./NonPlayerActor";
import Stats from "../Stats";

export default interface Nemesis extends SingleNonPlayerCharacter {
    strain: Stats
}