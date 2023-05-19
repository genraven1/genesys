import {Card, CardContent, CardHeader} from "@mui/material";
import ViewNonPlayerCharacterSkillTable from "./ViewNonPlayerCharacterSkillTable";
import NonPlayerCharacter from "../../../../models/actor/npc/NonPlayerCharacter";

interface Props {
    npc: NonPlayerCharacter
}

export default function NonPlayerCharacterSkillCard(props: Props): JSX.Element {
    const {npc} = props

    return (
        <Card sx={{"width": 1}}>
            <CardHeader title={'Skills'} style={{textAlign:'center'}}/>
            <CardContent>
                <ViewNonPlayerCharacterSkillTable npc={npc} />
            </CardContent>
        </Card>
    )
}