import {LorePath} from "../RootPath";
import {Organization} from "../../models/lore/Organization";

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

    static async getOrganizations(): Promise<Organization[]> {
        return await fetch(LorePath.Organization)
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