import {useEffect, useState} from "react";
import RollService from "../../services/RollService";
import Roll, {Results} from "../../models/Roll";

export function useRollDice(roll: Roll): Results {
    const [results, setResults] = useState<Results>()

    useEffect(() => {
        (async (): Promise<void> => {
            try {
                const resultsData = await RollService.rollDice(roll)
                if (resultsData) {
                    setResults(resultsData)
                }
            } catch (err) {
                console.log(err)
            }
        })()
    }, [roll, setResults])
    return results as Results
}