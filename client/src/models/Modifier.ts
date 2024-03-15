import {Option} from "../components/common/InputSelectField";

export default interface Modifier {
    modifier: Type
    ranks: number
}

export enum Type {
    IncreaseWoundThreshold = 'Increase Wound Threshold',
    SufferWounds = 'Suffer Wounds'
}

export const getModifierOptions = (): Option[] => {
    return Object.values(Type).map((value) => ({value}))
}