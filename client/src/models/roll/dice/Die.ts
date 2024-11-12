import {GenesysSymbols} from "../GenesysSymbols";

export class Die {
    faces: GenesysSymbols[][];

    constructor(faces: GenesysSymbols[][]) {
        this.faces = faces;
    }

    roll(): GenesysSymbols[] {
        const index = Math.floor(Math.random() * this.faces.length);
        return this.faces[index];
    }
}