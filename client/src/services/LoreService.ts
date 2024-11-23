import {Organization} from "../models/lore/Organization";
import Lore from "../models/lore/Lore";
import {CampaignPath, LorePath} from "./RootPath";


export default class LoreService {

    static async createLore(path: LorePath, name: string): Promise<Lore> {
        return await fetch(`${path}` + `${name}`, {
            method: "POST"
        })
            .then((res) => {
                console.log(res)
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async getLore(path: LorePath, id: string): Promise<any> {
        return await fetch(`${path}` + `${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async getAllLore(campaignId: string): Promise<Lore[]> {
        return await fetch(CampaignPath.Campaign + `${campaignId}` + CampaignPath.Lore)
            .then((res) => {
                switch (res.status) {
                    case 204:
                        return []
                    case 200:
                        return res.json()
                    default:
                        throw new Error(res.statusText)
                }
            })
    }

    static async getAllLoreOfType(campaignId: string, path: LorePath)  {
        return await fetch(CampaignPath.Campaign + `${campaignId}` + `${path}`)
            .then((res) => {
                switch (res.status) {
                    case 204:
                        return []
                    case 200:
                        return res.json()
                    default:
                        throw new Error(res.statusText)
                }
            })
    }

    static async updateOrganization(organization: Organization): Promise<Organization> {
        return await fetch(LorePath.Organization + `${organization.id}`, {
            method: "PUT",
            body: JSON.stringify(organization),
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
}