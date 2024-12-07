import InitiativeSlot from "../../../../models/campaign/InitiativeSlot";
import {Card, CardContent} from "@mui/material";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader";
import GenesysDescriptionTypography from "../../../common/typography/GenesysDescriptionTypography";
import {convertResultsToString} from "../../../roll/DiceRoll";

interface Props {
    slot: InitiativeSlot
}

export default function InitiativeSlotCard(props: Props) {
    const {slot} = props;

    return (
        <Card>
            <CenteredCardHeader title={slot.type}/>
            <CardContent>
                <GenesysDescriptionTypography text={convertResultsToString(slot.results)}/>
            </CardContent>
        </Card>
    )
}