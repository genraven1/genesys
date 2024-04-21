import Session from "./Session";


export default interface Campaign {
    name: string;
    sessions: Session[]
}