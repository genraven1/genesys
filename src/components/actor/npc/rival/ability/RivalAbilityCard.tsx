import {Button, Card, CardContent} from "@mui/material";
import * as React from "react";
import Typography from "@mui/material/Typography";
import {Fragment, useState} from "react";
import {useLocation} from "react-router-dom";
import NonPlayerCharacterAbilityTable from "../../ability/NonPlayerCharacterAbilityTable";
import CreateRivalAbilityDialog from "./CreateRivalAbilityDialog";
import CenteredCardHeader from "../../../../common/card/CenteredCardHeader";
import Rival from "../../../../../models/actor/npc/Rival";

interface Props {
    rival: Rival
}

export default function RivalAbilityCard(props: Props): JSX.Element {
    const {rival} = props
    const [openCreateAbilityDialog, setOpenCreateAbilityDialog] = useState(false)
    const pathname = useLocation().pathname

    const renderTable = (): JSX.Element => {
        if (rival?.abilities!!.length === 0) {
            return <Typography style={{textAlign: 'center'}}>None</Typography>
        }
        return <NonPlayerCharacterAbilityTable npc={rival}/>
    }

    const renderCreateAbilityButton = (): JSX.Element => {
        if (pathname.endsWith('/edit')) {
            return (
                <Fragment>
                    <Button color='primary' variant='contained' onClick={(): void => setOpenCreateAbilityDialog(true)}>Create
                        Ability</Button>
                    {openCreateAbilityDialog && <CreateRivalAbilityDialog rival={rival} open={openCreateAbilityDialog}
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