import CampaignSession from "./CampaignSession";
import Party from "./Party";


export default interface Campaign {
    id: string;
    name: string;
    party: Party
    sessions: CampaignSession[]
    current: boolean;
}