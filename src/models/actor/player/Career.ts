import Skill from "../Skill";
import Setting from "../../Setting";

export default interface Career {
    name: string
    skills: Skill[]
    settings: Setting[]
}