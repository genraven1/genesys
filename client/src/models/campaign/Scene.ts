import Party from "./Party";
import Encounter from "./encounter/Encounter";

export default interface Scene {
    id: string
    name: string
    party: Party
    encounters: Encounter[]
}