export default class ModifierService {

    static async getModifiers(): Promise<string[]> {
        return await fetch('/modifiers/')
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }
}