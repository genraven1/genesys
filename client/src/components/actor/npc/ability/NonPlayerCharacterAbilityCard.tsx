import NonPlayerActor from "../../../../models/actor/npc/NonPlayerActor";
import {Button, Card, CardContent, CardHeader} from "@mui/material";
import * as React from "react";
import Typography from "@mui/material/Typography";
import NonPlayerCharacterAbilityTable from "./NonPlayerCharacterAbilityTable";
import {useState} from "react";
import CreateAbilityDialog from "./CreateAbilityDialog";

interface Props {
    npc: NonPlayerActor
}
export default function NonPlayerCharacterAbilityCard(props: Props): JSX.Element {
    const {npc} = props
    const [openCreateAbilityDialog, setOpenCreateAbilityDialog] = useState(false)

    const renderTable = (): JSX.Element => {
        if (npc?.abilities!!.length === 0) {
            return <Typography style={{textAlign:'center'}}>None</Typography>
        }
        return <NonPlayerCharacterAbilityTable npc={npc} />
    }

    return (
        <Card sx={{"width": 1}}>
            <CardHeader title={'Abilities'} style={{textAlign:'center'}}/>
            <CardContent>
                {renderTable()}
                <Button color='primary' variant='contained' onClick={(): void => setOpenCreateAbilityDialog(true)}>Create Ability</Button>
                {openCreateAbilityDialog && <CreateAbilityDialog actor={npc} open={openCreateAbilityDialog} onClose={(): void => setOpenCreateAbilityDialog(false)}/>}
            </CardContent>
        </Card>
    )
}