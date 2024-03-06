import {Card, CardContent} from "@mui/material";
import {useLocation} from "react-router-dom";
import {Fragment} from "react";
import CenteredCardHeader from "../../../../common/card/CenteredCardHeader";
import Minion from "../../../../../models/actor/npc/Minion";

interface Props {
    minion: Minion
}

export default function MinionSkillCard(props: Props): JSX.Element {
    const {minion} = props
    const pathname = useLocation().pathname

    const renderSkillTable = (): JSX.Element => {
        // if (rival) {
        //     switch (rival.type) {
        //         case ActorType.Minion:
        //             if (pathname.endsWith('/view')) {
        //                 return <ViewMinionSkillTable minion={rival as Minion}/>
        //             } else if (pathname.endsWith('/edit')) {
        //                 return <EditMinionSkillTable minion={rival as Minion}/>
        //             } else {
        //                 return <Fragment/>
        //             }
        //         case ActorType.Rival:
        //             if (pathname.endsWith('/view')) {
        //                 return <ViewRivalSkillTable rival={rival}/>
        //             } else if (pathname.endsWith('/edit')) {
        //                 return <RivalSkillTable rival={rival}/>
        //             } else {
        //                 return <Fragment/>
        //             }
        //     }
        // }
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