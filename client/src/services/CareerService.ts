import {RootPath} from "./Path";
import Career from "../models/actor/player/Career";

export default class careerService {
    static async getCareers(): Promise<Career[]> {
        return await fetch(RootPath.Career)
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

    static async getCareer(id: string): Promise<Career> {
        return await fetch(RootPath.Career + `${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async createCareer(name: string): Promise<Career> {
        return await fetch(RootPath.Career + `${name}`, {method: "POST"})
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async updateCareer(career: Career): Promise<Career> {
        return await fetch(RootPath.Career + `${career.id}`, {
            method: "PUT",
            body: JSON.stringify(career),
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