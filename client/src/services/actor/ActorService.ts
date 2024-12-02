import Actor from "../../models/actor/Actor";
import NonPlayerActor from "../../models/actor/npc/NonPlayerActor";
import {ActorPath, CampaignPath} from "../RootPath";

export default class ActorService {

    static async getActors(campaignName: string): Promise<Actor[]> {
        return await fetch(CampaignPath.Campaign + `${campaignName}` + ActorPath.Actor)
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

    static async getNonPlayerCharacters(campaignName: string): Promise<NonPlayerActor[]> {
        return await fetch(CampaignPath.Campaign + `${campaignName}` + ActorPath.Npc)
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