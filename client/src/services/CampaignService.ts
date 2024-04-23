import Campaign from "../models/campaign/Campaign";
import axios from "axios";
import {CampaignPath} from "./Path";

export default class CampaignService {
    static async createCampaign(name: string): Promise<Campaign> {
        return await (await axios.post(CampaignPath.Campaign + name)).data;
    }

    static async getCampaigns(): Promise<Campaign[]> {
        return await (await axios.get(CampaignPath.Campaign)).data;
    }

    static async getCampaign(name: string): Promise<Campaign> {
        return await (await axios.get(CampaignPath.Campaign + name)).data;
    }

    static async updateCampaign(name: string, campaign: Campaign): Promise<Campaign> {
        return await (await axios.put(CampaignPath.Campaign + name, campaign)).data;
    }
}