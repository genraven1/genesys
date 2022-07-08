import NonPlayerCharacter from "./NonPlayerCharacter";

export default interface Rival extends NonPlayerCharacter {
}

export enum RivalKey {
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
    Skills = 'skills'
}