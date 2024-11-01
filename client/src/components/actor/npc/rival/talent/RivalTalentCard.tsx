import {Button, Card, CardContent} from "@mui/material";
import RivalTalentTable from "./RivalTalentTable";
import { Fragment, useState } from "react";
import { useLocation } from "react-router-dom";
import Rival from "../../../../../models/actor/npc/Rival";
import GenesysDescriptionTypography from "../../../../common/typography/GenesysDescriptionTypography";
import CenteredCardHeader from "../../../../common/card/CenteredCardHeader";
import RivalTalentSelectionDialog from "./RivalTalentSelectionDialog";

interface Props {
    rival: Rival
}

export default function RivalTalentCard(props: Props) {
    const {rival} = props
    const [openSelectTalentDialog, setOpenSelectTalentDialog] = useState(false)
    const pathname = useLocation().pathname

    const renderTable = () => {
        if (rival.talents.length === 0) {
            return <GenesysDescriptionTypography text={'None'}/>
        }
        return <RivalTalentTable rival={rival} />
    }

    const renderButton = () => {
        if (pathname.endsWith('/edit')) {
            return (
                <Fragment>
                    <Button color='primary' variant='contained' onClick={(): void => setOpenSelectTalentDialog(true)}>Add Talent</Button>
                    {openSelectTalentDialog && <RivalTalentSelectionDialog rival={rival} open={openSelectTalentDialog}
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