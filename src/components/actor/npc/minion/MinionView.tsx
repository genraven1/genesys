import { Box, Card, CardContent, CardHeader } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Minion from "../../../../models/actor/Minion";
import ActorService from "../../../../services/ActorService";

interface MinionProps {
    minion?: Minion
}

function useFetchMinion(id: string): MinionProps {
    const [ minion, setMinion ] = useState<Minion>();

    useEffect(() => {
        (async (): Promise<void> => {
            const dbMinion = await ActorService.getMinion(id);
            console.log(dbMinion);
            setMinion(dbMinion);
        })();
    }, [id]);

    return {minion};
}

export default function MinionView() {
    const { id } = useParams< {id: string}>();
    const { minion } = useFetchMinion(id!!);

    return (
        <Box>
            <Card>
                <CardHeader title={minion?.name}>

                </CardHeader>
                <CardContent>
                    
                </CardContent>
            </Card>
        </Box>
    )
}