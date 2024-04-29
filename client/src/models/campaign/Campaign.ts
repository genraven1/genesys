import CampaignSession from "./CampaignSession";
import Party from "./Party";
import Talent from "../Talent";


export default interface Campaign {
    name: string;
    party: Party
    sessions: CampaignSession[]
    talents: Talent[]
}