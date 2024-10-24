import {Option} from "../../components/common/InputSelectField";

export enum RangeBand {
    Engaged = 'Engaged',
    Short = 'Short',
    Medium = 'Medium',
    Long = 'Long',
    Extreme = 'Extreme',
    Strategic = 'Strategic'
}

export const getRangeOptions = (): Option[] => {
    return Object.values(RangeBand).map((value) => ({value}))
}