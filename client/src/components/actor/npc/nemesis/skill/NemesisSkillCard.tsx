import {Card, CardContent} from "@mui/material";
import {useLocation} from "react-router-dom";
import {Fragment} from "react";
import ViewNemesisSkillTable from "./ViewNemesisSkillTable";
import NemesisSkillTable from "./NemesisSkillTable";
import Nemesis from "../../../../../models/actor/npc/Nemesis";
import CenteredCardHeader from "../../../../common/card/CenteredCardHeader";

interface Props {
    nemesis: Nemesis
}

export default function NemesisSkillCard(props: Props): JSX.Element {
    const {nemesis} = props
    const pathname = useLocation().pathname

    const renderSkillTable = (): JSX.Element => {
        if (pathname.endsWith('/view')) {
            return <ViewNemesisSkillTable nemesis={nemesis}/>
        } else if (pathname.endsWith('/edit')) {
            return <NemesisSkillTable nemesis={nemesis}/>
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