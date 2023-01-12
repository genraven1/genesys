import NonPlayerCharacter from "../../../models/actor/npc/NonPlayerCharacter";
import {Card, CardContent, CardHeader} from "@mui/material";
import ViewNonPlayerCharacterSkillTable from "./ViewNonPlayerCharacterSkillTable";
import NonPlayerCharacterTalentTable from "./NonPlayerCharacterTalentTable";

interface Props {
    npc: NonPlayerCharacter
}
export default function NonPlayerCharacterTalentCard(props: Props): JSX.Element {
    const {npc} = props
    return (
        <Card>
            <CardHeader title={'Talents'} style={{textAlign:'center'}}/>
            <CardContent>
                <NonPlayerCharacterTalentTable npc={npc} />
            </CardContent>
        </Card>
    )
}