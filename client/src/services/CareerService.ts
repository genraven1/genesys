import {RootPath} from "./Path";
import Career from "../models/actor/player/Career";

export default class careerService {
    static async getCareers(): Promise<Career[]> {
        return await fetch(RootPath.Career)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async getCareer(name: string): Promise<Career> {
        return await fetch(RootPath.Career + `${name}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async createCareer(name: string): Promise<Career> {
        return await fetch(RootPath.Career, {method: "POST", body: JSON.stringify({name: name})})
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async updateCareer(career: Career): Promise<Career> {
        return await fetch(RootPath.Career + `${career.name}`, {method: 'PUT', body: JSON.stringify(career)})
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }
}