import {LorePath} from "../RootPath";

export default class OrganizationService {
    static async createOrganization(name: string) {
        return await fetch(LorePath.Organization + `${name}`, {
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

    static async getOrganization(id: string) {
        return await fetch(LorePath.Organization + `${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }
}