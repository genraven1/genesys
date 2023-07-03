import {Button, Card, CardContent} from "@mui/material";
import {useLocation} from "react-router-dom";
import {Fragment, useState} from "react";
import Archetype from "../../../models/actor/player/Archetype";
import CenteredCardHeader from "../../common/card/CenteredCardHeader";
import ViewAbilityTable from "./ViewAbilityTable";
import * as React from "react";
import CreateAbilityDialog from "./CreateAbilityDialog";
import {CenteredGenesysTypography} from "../../common/typography/GenesysTypography";

interface Props {
    archetype: Archetype
}

export default function ArchetypeAbilityCard(props: Props): JSX.Element {
    const {archetype} = props
    const [openCreateAbilityDialog, setOpenCreateAbilityDialog] = useState(false)
    const pathname = useLocation().pathname

    const renderAbilityTable = (): JSX.Element => {
        if (archetype?.abilities!!.length === 0) {
            return <CenteredGenesysTypography value={'None'}/>
        }
        return <ViewAbilityTable archetype={archetype}/>
    }

    const renderTable = (): JSX.Element => {
        if (pathname.endsWith('/view')) {
            return <Fragment>{renderAbilityTable()}</Fragment>
        } else if (pathname.endsWith('/edit')) {
            return (
                <Fragment>
                    {renderAbilityTable()}
                    <Button color='primary' variant='contained'
                            onClick={(): void => setOpenCreateAbilityDialog(true)}>Create Ability</Button>
                    {openCreateAbilityDialog &&
                        <CreateAbilityDialog archetype={archetype} open={openCreateAbilityDialog}
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
            </CardContent>
        </Card>
    )
}