import {Card, CardContent} from "@mui/material";
import {useLocation} from "react-router-dom";
import {Fragment} from "react";
import CenteredCardHeader from "../../../../common/card/CenteredCardHeader";
import Minion from "../../../../../models/actor/npc/Minion";
import ViewMinionSkillTable from "./ViewMinionSkillTable";
import EditMinionSkillTable from "./EditMinionSkillTable";

interface Props {
    minion: Minion
}

export default function MinionSkillCard(props: Props): JSX.Element {
    const {minion} = props
    const pathname = useLocation().pathname

    const renderSkillTable = (): JSX.Element => {
        if (pathname.endsWith('/view')) {
            return <ViewMinionSkillTable minion={minion}/>
        } else if (pathname.endsWith('/edit')) {
            return <EditMinionSkillTable minion={minion}/>
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