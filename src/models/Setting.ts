import { WithFieldValue } from "firebase/firestore";
import firebase from "firebase/compat";
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
import FirestoreDataConverter = firebase.firestore.FirestoreDataConverter;

export default interface Setting {
    name: string
    magic: boolean
}

export class CurrentSetting {
    name: string;
    magic: boolean;

    constructor(name: string, magic: boolean) {
        this.name = name;
        this.magic = magic;
    }
}

export const converter: FirestoreDataConverter<CurrentSetting> = {
    toFirestore(setting: CurrentSetting): CurrentSetting {
        return {
            name: setting.name,
            magic: setting.magic,
        } as CurrentSetting
    },
    fromFirestore(snapshot: QueryDocumentSnapshot): CurrentSetting {
        const data = snapshot.data() as CurrentSetting
        return new CurrentSetting(data.name, data.magic)
    }
}