import {Card, CardContent} from "@mui/material";
import ViewNonPlayerCharacterSkillTable from "./ViewNonPlayerCharacterSkillTable";
import NonPlayerCharacter from "../../../../models/actor/npc/NonPlayerCharacter";
import {useLocation} from "react-router-dom";
import {Fragment} from "react";
import NonPlayerCharacterSkillTable from "./NonPlayerCharacterSkillTable";
import CenteredCardHeader from "../../../common/card/CenteredCardHeader";

interface Props {
    npc: NonPlayerCharacter
}

export default function NonPlayerCharacterSkillCard(props: Props): JSX.Element {
    const {npc} = props
    const pathname = useLocation().pathname

    const renderSkillTable = ():JSX.Element => {
        if (pathname.endsWith('/view')) {
            return <ViewNonPlayerCharacterSkillTable npc={npc} />
        } else if (pathname.endsWith('/edit')) {
            return <NonPlayerCharacterSkillTable npc={npc}/>
        } else {
            return <Fragment/>
        }
    }


    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Skills'}/>
            <CardContent>
                {renderSkillTable()}
            </CardContent>
        </Card>
    )
}