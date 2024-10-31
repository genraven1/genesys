import Skill from "../../../models/actor/Skill";
import {ActorSkill, ActorType} from "../../../models/actor/Actor";
import Minion from "../../../models/actor/npc/Minion";
import NonPlayerActor, {SingleNonPlayerCharacter} from "../../../models/actor/npc/NonPlayerActor";
import {ActorWeapon} from "../../../models/equipment/Weapon";
import Player, {PlayerSkill} from "../../../models/actor/player/Player";

export const renderSkillName = (skill: Skill): string => {
    return !skill ? 'None' : skill.name;
}

export const renderSkillNames = (skills: Skill[]) => {
    if (skills === undefined || skills.length === 0) {
        return 'None'
    }
    let skillList = skills.sort((a, b) => a.name.localeCompare(b.name))
    let skillNames = ''
    for (let i = 0; i < skillList.length; i++) {
        skillNames = i !== skillList.length - 1 ? skillNames.concat(skillList[i].name + ', ') : skillNames.concat(skillList[i].name);
    }
    return skillNames
}

export const getActorSkill = (npc: NonPlayerActor, weapon: ActorWeapon): ActorSkill => {
    let actorSkill = {} as ActorSkill
    switch (npc.type) {
        case ActorType.Minion:
            let minion = npc as Minion
            for (let skill of minion.skills) {
                if (skill.name === weapon.skill.name) {
                    actorSkill = {...{...skill} as Skill, ranks: 0} as ActorSkill
                }
            }
            break
        case ActorType.Rival:
        case ActorType.Nemesis:
            let single = npc as SingleNonPlayerCharacter
            for (let skill of single.skills) {
                if (skill.name === weapon.skill.name) {
                    actorSkill = skill as ActorSkill
                }
            }
            break
    }
    return actorSkill
}

export const getPlayerSkill = (player: Player, weapon: ActorWeapon) => {
    let playerSkill = {} as ActorSkill
    for (let skill of player.skills) {
        if (skill.name === weapon.skill.name) {
            playerSkill = skill as PlayerSkill
        }
    }
    return playerSkill
}