import {Option} from "../../components/common/InputSelectField";

export enum Difficulty {
    Easy = 'Easy',
    Average = 'Average',
    Hard = 'Hard',
    Daunting = 'Daunting',
    Formidable = 'Formidable'
}

export const getDifficultyOptions = (): Option[] => {
    return Object.values(Difficulty).map((value) => ({value}))
}