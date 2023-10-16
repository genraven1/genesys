import NonPlayerCharacter from "../../../../models/actor/npc/NonPlayerCharacter";
import {Card, CardContent} from "@mui/material";
import NonPlayerCharacterTalentTable from "./NonPlayerCharacterTalentTable";
import * as React from "react";
import CenteredCardHeader from "../../../common/card/CenteredCardHeader";
import GenesysDescriptionTypography from "../../../common/typography/GenesysDescriptionTypography";

interface Props {
    npc: NonPlayerCharacter
}
export default function NonPlayerCharacterTalentCard(props: Props): JSX.Element {
    const {npc} = props

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
            </CardContent>
        </Card>
    )
}