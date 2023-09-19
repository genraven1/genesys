import Setting from './Setting.ts';

export interface Skill {
    id: number,
    characteristic: string,
    type: string,
    name: string,
    settings: Setting[]
}