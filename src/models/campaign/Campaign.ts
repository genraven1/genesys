import CampaignSession from "./CampaignSession";
import Party from "./Party";


export default interface Campaign {
    campaign_id: number
    name: string;
    party: Party
    sessions: CampaignSession[]
}