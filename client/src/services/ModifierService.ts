export default class ModifierService {

    static async getModifiersByType(type: string): Promise<string[]> {
        return await fetch("/modifiers/" + `${type}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }
}