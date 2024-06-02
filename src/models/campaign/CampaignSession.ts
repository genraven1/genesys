import Party from "./Party";
import Scene from "./Scene";

export default interface CampaignSession {
    name: string
    party: Party
    scenes: Scene[]
}