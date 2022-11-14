import NonPlayerCharacter from "./NonPlayerCharacter";
import Stats from "../Stats";

export default interface Nemesis extends NonPlayerCharacter {
    strain: Stats
}