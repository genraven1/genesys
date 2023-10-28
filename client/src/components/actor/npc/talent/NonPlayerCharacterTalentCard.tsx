import NonPlayerCharacter from "../../../../models/actor/npc/NonPlayerCharacter";
import GenesysDescriptionTypography from "../../../common/typography/GenesysDescriptionTypography";
import NonPlayerCharacterTalentTable from "./NonPlayerCharacterTalentTable";
import {Button, Card, CardContent} from "@mui/material";
import CenteredCardHeader from "../../../common/card/CenteredCardHeader";
import * as React from "react";
import TalentSelectionDialog from "../../common/talent/TalentSelectionDialog";
import {useState} from "react";

interface Props {
    npc: NonPlayerCharacter
}
export default function NonPlayerCharacterTalentCard(props: Props): JSX.Element {
    const {npc} = props
    const [openSelectTalentDialog, setOpenSelectTalentDialog] = useState(false)

    const renderTable = (): JSX.Element => {
        if (npc?.talents!!.length === 0) {
            return <GenesysDescriptionTypography text={'None'}/>
        }
        return <NonPlayerCharacterTalentTable npc={npc} />
    }

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Talents'}/>
            <CardContent>
                {renderTable()}
                <Button color='primary' variant='contained' onClick={(): void => setOpenSelectTalentDialog(true)}>Add Talent</Button>
                {openSelectTalentDialog && <TalentSelectionDialog actor={npc} open={openSelectTalentDialog}
                                                                  onClose={(): void => setOpenSelectTalentDialog(false)}/>}
            </CardContent>
        </Card>
    )
}