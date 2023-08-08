import Lore from "./Lore";

export enum OrgType {
    Religious = 'Religious',
    Social = 'Social',
    Political = 'Political',
    Military = 'Military',
    Academic = 'Academic'
}

export interface Organization extends Lore {
    orgType: OrgType
    founded: number
    disbanded: number
    nickname: string
    membersName: string
}

export enum OrgKey {
    name = 'name',
    type = 'type',
    orgType = 'orgType',
    founded = 'founded',
    disbanded = 'disbanded',
    nickname = 'nickname',
    membersName = 'membersName'
}
