import {Button, Card, CardContent} from "@mui/material";
import * as React from "react";
import Typography from "@mui/material/Typography";
import {Fragment, useState} from "react";
import {useLocation} from "react-router-dom";
import Nemesis from "../../../../../models/actor/npc/Nemesis";
import NonPlayerCharacterAbilityTable from "../../ability/NonPlayerCharacterAbilityTable";
import CreateNemesisAbilityDialog from "./CreateNemesisAbilityDialog";
import CenteredCardHeader from "../../../../common/card/CenteredCardHeader";

interface Props {
    nemesis: Nemesis
}

export default function NemesisAbilityCard(props: Props): JSX.Element {
    const {nemesis} = props
    const [openCreateAbilityDialog, setOpenCreateAbilityDialog] = useState(false)
    const pathname = useLocation().pathname

    const renderTable = (): JSX.Element => {
        if (nemesis?.abilities!!.length === 0) {
            return <Typography style={{textAlign: 'center'}}>None</Typography>
        }
        return <NonPlayerCharacterAbilityTable npc={nemesis}/>
    }

    const renderCreateAbilityButton = (): JSX.Element => {
        if (pathname.endsWith('/edit')) {
            return (
                <Fragment>
                    <Button color='primary' variant='contained' onClick={(): void => setOpenCreateAbilityDialog(true)}>Create
                        Ability</Button>
                    {openCreateAbilityDialog && <CreateNemesisAbilityDialog nemesis={nemesis} open={openCreateAbilityDialog}
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