import NonPlayerActor from "../../../../models/actor/npc/NonPlayerActor";
import {Card, CardContent, CardHeader} from "@mui/material";
import * as React from "react";
import Typography from "@mui/material/Typography";
import NonPlayerCharacterAbilityTable from "./NonPlayerCharacterAbilityTable";

interface Props {
    npc: NonPlayerActor
}

export default function ViewNonPlayerCharacterAbilityCard(props: Props): JSX.Element {
    const {npc} = props

    const renderTable = (): JSX.Element => {
        if (npc?.abilities!!.length === 0) {
            return <Typography style={{textAlign: 'center'}}>None</Typography>
        }
        return <NonPlayerCharacterAbilityTable npc={npc}/>
    }

    return (
        <Card sx={{"width": 1}}>
            <CardHeader title={'Abilities'} style={{textAlign: 'center'}}/>
            <CardContent>
                {renderTable()}
            </CardContent>
        </Card>
    )
}