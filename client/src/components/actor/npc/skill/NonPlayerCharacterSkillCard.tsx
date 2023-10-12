import {Card, CardContent} from "@mui/material";
import ViewNonPlayerCharacterSkillTable from "./ViewNonPlayerCharacterSkillTable";
import NonPlayerCharacter, {SingleNonPlayerCharacter} from "../../../../models/actor/npc/NonPlayerCharacter";
import {useLocation} from "react-router-dom";
import {Fragment} from "react";
import NonPlayerCharacterSkillTable from "./NonPlayerCharacterSkillTable";
import CenteredCardHeader from "../../../common/card/CenteredCardHeader";
import {ActorType} from "../../../../models/actor/Actor";
import ViewMinionSkillTable from "../minion/ViewMinionSkillTable";
import EditMinionSkillTable from "../minion/EditMinionSkillTable";
import Minion from "../../../../models/actor/npc/Minion";

interface Props {
    npc: NonPlayerCharacter
}

export default function NonPlayerCharacterSkillCard(props: Props): JSX.Element {
    const {npc} = props
    const pathname = useLocation().pathname

    const renderSkillTable = (): JSX.Element => {
        switch (npc.type) {
            case ActorType.Minion:
                if (pathname.endsWith('/view')) {
                    return <ViewMinionSkillTable minion={npc as Minion}/>
                } else if (pathname.endsWith('/edit')) {
                    return <EditMinionSkillTable minion={npc as Minion}/>
                } else {
                    return <Fragment/>
                }
            case ActorType.Rival:
            case ActorType.Nemesis:
                if (pathname.endsWith('/view')) {
                    return <ViewNonPlayerCharacterSkillTable npc={npc as SingleNonPlayerCharacter}/>
                } else if (pathname.endsWith('/edit')) {
                    return <NonPlayerCharacterSkillTable npc={npc as SingleNonPlayerCharacter}/>
                } else {
                    return <Fragment/>
                }
        }
        return <Fragment/>
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