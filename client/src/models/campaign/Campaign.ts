import Session from "./Session";
import Party from "./Party";


export default interface Campaign {
    name: string;
    party: Party
    sessions: Session[]
}