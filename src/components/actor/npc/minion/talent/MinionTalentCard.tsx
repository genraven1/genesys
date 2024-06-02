import {Button, Card, CardContent} from "@mui/material";
import CenteredCardHeader from "../../../../common/card/CenteredCardHeader";
import GenesysDescriptionTypography from "../../../../common/typography/GenesysDescriptionTypography";
import { Fragment, useState } from "react";
import { useLocation } from "react-router-dom";
import Minion from "../../../../../models/actor/npc/Minion";
import MinionTalentTable from "./MinionTalentTable";
import MinionTalentSelectionDialog from "./MinionTalentSelectionDialog";

interface Props {
    minion: Minion
}

export default function MinionTalentCard(props: Props): JSX.Element {
    const {minion} = props
    const [openSelectTalentDialog, setOpenSelectTalentDialog] = useState(false)
    const pathname = useLocation().pathname

    const renderTable = (): JSX.Element => {
        if (minion.talents!!.length === 0){
            return <GenesysDescriptionTypography text={'None'}/>
        }
        return <MinionTalentTable minion={minion}/>
    }

    const renderButton = (): JSX.Element => {
        if (pathname.endsWith('/edit')) {
            return (
                <Fragment>
                    <Button color='primary' variant='contained' onClick={(): void => setOpenSelectTalentDialog(true)}>Add Talent</Button>
                    {openSelectTalentDialog && <MinionTalentSelectionDialog minion={minion} open={openSelectTalentDialog}
                                                                            onClose={(): void => setOpenSelectTalentDialog(false)}/>}
                </Fragment>
            )
        } else {
            return <Fragment/>
        }
    }

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Talents'}/>
            <CardContent>
                {renderTable()}
                {renderButton()}
            </CardContent>
        </Card>
    )
}