import Campaign from "../models/campaign/Campaign";
import axios from "axios";
import {CampaignPath} from "./RootPath";
import CampaignSession from "../models/campaign/CampaignSession";
import Scene from "../models/campaign/Scene";

export default class CampaignService {
    static async createCampaign(name: string): Promise<Campaign> {
        return await fetch(CampaignPath.Campaign, {method: "POST", body: JSON.stringify({name: name})})
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async getAllCampaigns(): Promise<Campaign[]> {
        return await fetch(CampaignPath.Campaign)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async getCampaign(id: string): Promise<Campaign> {
        return await fetch(CampaignPath.Campaign + `${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async updateCampaign(name: string, campaign: Campaign): Promise<Campaign> {
        return await (await axios.put(CampaignPath.Campaign + name, campaign)).data;
    }

    static async createSession(campaignName: string, sessionName: string): Promise<CampaignSession> {
        return await (await axios.put(CampaignPath.Campaign + campaignName + CampaignPath.Session + sessionName)).data;
    }

    static async getSession(campaignName: string, sessionName: string): Promise<CampaignSession> {
        return await (await axios.get(CampaignPath.Campaign + campaignName + CampaignPath.Session + sessionName)).data;
    }

    static async createScene(campaignName: string, sessionName: string, sceneName: string): Promise<Scene> {
        return await (await axios.put(CampaignPath.Campaign + campaignName + CampaignPath.Session + sessionName + CampaignPath.Scene + sceneName)).data;
    }

    static async getScene(campaignName: string, sessionName: string, sceneName: string): Promise<CampaignSession> {
        return await (await axios.get(CampaignPath.Campaign + campaignName + CampaignPath.Session + sessionName + CampaignPath.Scene + sceneName)).data;
    }
}