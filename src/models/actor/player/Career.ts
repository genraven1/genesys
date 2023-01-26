export default interface Career {
    name: string
    skills: CareerSkill[]
}

export interface CareerSkill {
    name: string
    active: boolean
}