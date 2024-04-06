import {Option} from "../../components/common/InputSelectField";

export default interface Cost {
    type: CostType
    amount: number
}

export enum CostType {
    None = 'None',
    Strain = 'Strain',
    StoryPoint = 'StoryPoint'
}

export const getCostOptions = (): Option[] => {
    return Object.values(CostType).map((value) => ({value}))
}

export class DefaultCost {
    static create(): Cost {
        return {
            type: CostType.None,
            amount: 0,
        }
    }
}