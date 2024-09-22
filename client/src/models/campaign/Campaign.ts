import CampaignSession from "./CampaignSession";
import Party from "./Party";


export default interface Campaign {
    name: string;
    party: Party
    sessions: CampaignSession[]
    current: boolean;
}