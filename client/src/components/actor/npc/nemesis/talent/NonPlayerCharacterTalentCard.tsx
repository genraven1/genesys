import {Button, Card, CardContent} from "@mui/material";
import NonPlayerCharacterTalentTable from "./NonPlayerCharacterTalentTable";
import { Fragment, useState } from "react";
import { useLocation } from "react-router-dom";
import NemesisTalentSelectionDialog from "./NemesisTalentSelectionDialog";
import Nemesis from "../../../../../models/actor/npc/Nemesis";
import GenesysDescriptionTypography from "../../../../common/typography/GenesysDescriptionTypography";
import CenteredCardHeader from "../../../../common/card/CenteredCardHeader";

interface Props {
    nemesis: Nemesis
}

export default function NonPlayerCharacterTalentCard(props: Props): JSX.Element {
    const {nemesis} = props
    const [openSelectTalentDialog, setOpenSelectTalentDialog] = useState(false)
    const pathname = useLocation().pathname

    const renderTable = (): JSX.Element => {
        if (nemesis?.talents!!.length === 0) {
            return <GenesysDescriptionTypography text={'None'}/>
        }
        return <NonPlayerCharacterTalentTable nemesis={nemesis} />
    }

    const renderButton = (): JSX.Element => {
        if (pathname.endsWith('/edit')) {
            return (
                <Fragment>
                    <Button color='primary' variant='contained' onClick={(): void => setOpenSelectTalentDialog(true)}>Add Talent</Button>
                    {openSelectTalentDialog && <NemesisTalentSelectionDialog nemesis={nemesis} open={openSelectTalentDialog}
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