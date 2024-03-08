import {Card, CardContent} from "@mui/material";
import {useLocation} from "react-router-dom";
import {Fragment} from "react";
import CenteredCardHeader from "../../../../common/card/CenteredCardHeader";
import ViewRivalSkillTable from "./ViewRivalSkillTable";
import RivalSkillTable from "./RivalSkillTable";
import Rival from "../../../../../models/actor/npc/Rival";

interface Props {
    rival: Rival
}

export default function RivalSkillCard(props: Props): JSX.Element {
    const {rival} = props
    const pathname = useLocation().pathname

    const renderSkillTable = (): JSX.Element => {
        if (pathname.endsWith('/view')) {
            return <ViewRivalSkillTable rival={rival}/>
        } else if (pathname.endsWith('/edit')) {
            return <RivalSkillTable rival={rival}/>
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