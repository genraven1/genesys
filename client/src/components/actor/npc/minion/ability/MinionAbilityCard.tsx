import {Button, Card, CardContent} from "@mui/material";
import * as React from "react";
import Typography from "@mui/material/Typography";
import {Fragment, useState} from "react";
import {useLocation} from "react-router-dom";
import NonPlayerCharacterAbilityTable from "../../ability/NonPlayerCharacterAbilityTable";
import CreateMinionAbilityDialog from "./CreateMinionAbilityDialog";
import CenteredCardHeader from "../../../../common/card/CenteredCardHeader";
import Minion from "../../../../../models/actor/npc/Minion";

interface Props {
    minion: Minion
}

export default function MinionAbilityCard(props: Props): JSX.Element {
    const {minion} = props
    const [openCreateAbilityDialog, setOpenCreateAbilityDialog] = useState(false)
    const pathname = useLocation().pathname

    const renderTable = (): JSX.Element => {
        if (minion?.abilities!!.length === 0) {
            return <Typography style={{textAlign: 'center'}}>None</Typography>
        }
        return <NonPlayerCharacterAbilityTable npc={minion}/>
    }

    const renderCreateAbilityButton = (): JSX.Element => {
        if (pathname.endsWith('/edit')) {
            return (
                <Fragment>
                    <Button color='primary' variant='contained' onClick={(): void => setOpenCreateAbilityDialog(true)}>Create
                        Ability</Button>
                    {openCreateAbilityDialog && <CreateMinionAbilityDialog minion={minion} open={openCreateAbilityDialog}
                                                                           onClose={(): void => setOpenCreateAbilityDialog(false)}/>}
                </Fragment>
            )
        } else {
            return <Fragment/>
        }
    }

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Abilities'}/>
            <CardContent>
                {renderTable()}
                {renderCreateAbilityButton()}
            </CardContent>
        </Card>
    )
}