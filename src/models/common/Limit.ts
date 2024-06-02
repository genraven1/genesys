import {Option} from "../../components/common/InputSelectField";

export default interface Limit {
    type: LimitType
    limit: number;
}

export enum LimitType {
    None = 'None',
    PerRound = 'Per Round',
    PerEncounter = 'Per Encounter',
    PerSession = 'Per Session'
}

export const getLimitOptions = (): Option[] => {
    return Object.values(LimitType).map((value) => ({value}))
}

export class DefaultLimit {
    static create():Limit {
        return {
            type: LimitType.None,
            limit: 0
        }
    }
}