import CampaignSession from "./CampaignSession";
import Party from "./Party";


export default interface Campaign {
    id: number;
    name: string;
    party: Party
    sessions: CampaignSession[]
    current: boolean;
}