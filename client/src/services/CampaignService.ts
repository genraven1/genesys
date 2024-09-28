import Campaign from "../models/campaign/Campaign";
import axios from "axios";
import {CampaignPath} from "./Path";
import CampaignSession from "../models/campaign/CampaignSession";
import Scene from "../models/campaign/Scene";
import Talent from "../models/Talent";
import Skill from "../models/actor/Skill";

export default class CampaignService {
    static async createCampaign(campaign: Campaign): Promise<Campaign> {
        return await fetch(CampaignPath.Campaign, {
            method: "POST",
            body: JSON.stringify(campaign),
            headers: {
                'Content-Type': 'application/json'
            }
        })
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

    static async getCampaign(name: string): Promise<Campaign> {
        return await fetch(CampaignPath.Campaign + `${name}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async getCampaignTalents(): Promise<Talent[]> {
        return await fetch(CampaignPath.Talents)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async addCampaignTalent(talent: Talent): Promise<Campaign> {
        return await fetch(CampaignPath.Talents, {
            method: "POST",
            body: JSON.stringify(talent),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async getCampaignSkills(): Promise<Skill[]> {
        return await fetch(CampaignPath.Skills)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async addCampaignSkill(skill: Skill): Promise<Campaign> {
        return await fetch(CampaignPath.Skills, {
            method: "POST",
            body: JSON.stringify(skill),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async getCurrentCampaign(): Promise<Campaign> {
        return await fetch(CampaignPath.Current)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async setCurrentCampaign(campaign_id: string): Promise<Campaign> {
        return await fetch(CampaignPath.Current + `${campaign_id}`, {method: "PUT"})
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
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