import Scene from "../models/campaign/Scene";
import {ActorPath, RootPath} from "./RootPath";
import Rival from "../models/actor/npc/Rival";


export default class SceneService {

    static async getScenes(): Promise<Scene[]> {
        return await fetch(RootPath.Scenes)
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

    static async getScene(id: string): Promise<Scene> {
        return await fetch(RootPath.Scenes + `${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async createScene(name: string): Promise<Scene> {
        return await fetch(RootPath.Scenes + `${name}`, {method: "POST"})
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async updateScene(scene: Scene): Promise<Scene> {
        return await fetch(RootPath.Scenes + `${scene.id}`, {
            method: "PUT",
            body: JSON.stringify(scene),
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

    static async getEnemyRivalsForScene(id: string): Promise<Rival[]> {
        return await fetch(RootPath.Scenes + `${id}` + ActorPath.Rival + 'enemies/')
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async addRivalToScene(id: string, rival: Rival): Promise<Scene> {
        return await fetch(RootPath.Scenes + `${id}` + ActorPath.Rival + 'enemies/', {
            method: "POST",
            body: JSON.stringify(rival),
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