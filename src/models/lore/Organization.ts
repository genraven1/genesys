import Lore, {LoreType} from "./Lore";

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

export class DefaultOrganization {
    static create(): Organization {
        return {
            name: '',
            type: LoreType.ORGANIZATION,
            orgType: OrgType.Religious,
            founded: 0,
            disbanded: 0,
            nickname: '',
            membersName: ''
        }
    }
}
