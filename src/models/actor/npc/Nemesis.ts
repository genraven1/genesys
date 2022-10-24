import NonPlayerCharacter from "./NonPlayerCharacter";
import Stats from "../Stats";

export default interface Nemesis extends NonPlayerCharacter {
    strain: Stats
}

export enum NemesisKey {
    Combat = 'combat',
    General = 'general',
    Social = 'social',
    Agility = 'agility',
    Brawn = 'brawn',
    Cunning = 'cunning',
    Intellect = 'intellect',
    Melee = 'melee',
    Name = 'name',
    Presence = 'presence',
    Ranged = 'ranged',
    Soak = 'soak',
    Talents = 'talents',
    Willpower = 'willpower',
    Wounds = 'wounds',
    Strain = 'strain',
    Skills = 'skills'
}