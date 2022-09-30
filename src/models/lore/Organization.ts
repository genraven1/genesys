import Lore, {LoreType} from "./Lore";

export default interface Organization extends Lore {

}

export class DefaultOrganization {
    static create(): Organization {
        return {
            name: "",
            type: LoreType.ORGANIZATION
        }
    }
}