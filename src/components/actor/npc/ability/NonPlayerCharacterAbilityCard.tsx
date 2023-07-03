import NonPlayerCharacter from "../../../../models/actor/npc/NonPlayerCharacter";
import {Button, Card, CardContent} from "@mui/material";
import * as React from "react";
import NonPlayerCharacterAbilityTable from "./NonPlayerCharacterAbilityTable";
import {useState} from "react";
import CreateAbilityDialog from "./CreateAbilityDialog";
import CenteredCardHeader from "../../../common/card/CenteredCardHeader";
import {CenteredGenesysTypography} from "../../../common/typography/GenesysTypography";

interface Props {
    npc: NonPlayerCharacter
}
export default function NonPlayerCharacterAbilityCard(props: Props): JSX.Element {
    const {npc} = props
    const [openCreateAbilityDialog, setOpenCreateAbilityDialog] = useState(false)

    const renderTable = (): JSX.Element => {
        if (npc?.abilities!!.length === 0) {
            return <CenteredGenesysTypography value={'None'}/>
        }
        return <NonPlayerCharacterAbilityTable npc={npc} />
    }

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Abilities'}/>
            <CardContent>
                {renderTable()}
                <Button color='primary' variant='contained' onClick={(): void => setOpenCreateAbilityDialog(true)}>Create Ability</Button>
                {openCreateAbilityDialog && <CreateAbilityDialog actor={npc} open={openCreateAbilityDialog} onClose={(): void => setOpenCreateAbilityDialog(false)}/>}
            </CardContent>
        </Card>
    )
}