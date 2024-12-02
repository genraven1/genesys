import Party from "./Party";

export default interface Scene {
    id: string
    name: string
    party: Party
    encounters: []
}