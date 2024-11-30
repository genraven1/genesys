import Lore from "../../models/lore/Lore";
import {CampaignPath} from "../RootPath";


export default class LoreService {
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


}