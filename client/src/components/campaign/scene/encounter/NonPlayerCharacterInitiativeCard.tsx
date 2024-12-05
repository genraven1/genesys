import {SingleNonPlayerCharacter} from "../../../../models/actor/npc/NonPlayerActor";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader";
import {Card, CardContent} from "@mui/material";

interface Props {
    npc: SingleNonPlayerCharacter
}

export default function NonPlayerCharacterInitiativeCard(props: Props) {
    const {npc} = props;

    return (
        <Card>
            <CenteredCardHeader title={npc.name}/>
            <CardContent>

            </CardContent>
        </Card>
    )
}