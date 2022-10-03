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
}

export enum OrgKey {
    name = 'name',
    type = 'type',
    orgType = 'orgType',
    founded = 'founded'
}

export class DefaultOrganization {
    static create(): Organization {
        return {
            name: "",
            type: LoreType.ORGANIZATION,
            orgType: OrgType.Religious,
            founded: 0
        }
    }
}
