import Scene from "../models/Scene";
import axios from "axios";
import {Path} from "./Path";

export default class SceneService {
    static async createScene(name: string): Promise<Scene> {
        return await (await axios.post('/scene/' + name)).data;
    }

    static async getScenes(): Promise<Scene[]> {
        return await (await axios.get(Path.Scene)).data;
    }

    static async getScene(id: number): Promise<Scene> {
        return await (await axios.get(Path.Scene + id)).data;
    }

    static async updateScene(id: number, setting: Scene): Promise<Scene> {
        return await (await axios.put(Path.Scene + id, setting)).data;
    }
}