import NonPlayerActor, { SingleNonPlayerCharacter } from "../../../../models/actor/npc/NonPlayerActor";
import {Button, Card, CardContent} from "@mui/material";
import NonPlayerCharacterTalentTable from "./NonPlayerCharacterTalentTable";
import CenteredCardHeader from "../../../common/card/CenteredCardHeader";
import GenesysDescriptionTypography from "../../../common/typography/GenesysDescriptionTypography";
import { Fragment, useState } from "react";
import { useLocation } from "react-router-dom";
import Minion from "../../../../models/actor/npc/Minion";
import { ActorType } from "../../../../models/actor/Actor";
import MinionTalentTable from "../minion/MinionTalentTable";
import TalentSelectionDialog from "../../common/talent/TalentSelectionDialog";

interface Props {
    npc: NonPlayerActor
}

export default function NonPlayerCharacterTalentCard(props: Props): JSX.Element {
    const {npc} = props
    const [openSelectTalentDialog, setOpenSelectTalentDialog] = useState(false)
    const pathname = useLocation().pathname

    const renderTable = (): JSX.Element => {
        switch (npc?.type!!) {
            case ActorType.Minion:
                let minion = npc as Minion
                if (minion.talents!!.length === 0){
                    return <GenesysDescriptionTypography text={'None'}/>
                }
                return <MinionTalentTable minion={minion}/>
            case ActorType.Rival:
            case ActorType.Nemesis:
                let single = npc as SingleNonPlayerCharacter
                if (single?.talents!!.length === 0) {
                    return <GenesysDescriptionTypography text={'None'}/>
                }
                return <NonPlayerCharacterTalentTable npc={single} />
        }
        return <Fragment/>
    }

    const renderButton = (): JSX.Element => {
        if (pathname.endsWith('/edit')) {
            return (
                <Fragment>
                    <Button color='primary' variant='contained' onClick={(): void => setOpenSelectTalentDialog(true)}>Add Talent</Button>
                    {openSelectTalentDialog && <TalentSelectionDialog actor={npc} open={openSelectTalentDialog}
                                                                      onClose={(): void => setOpenSelectTalentDialog(false)}/>}
                </Fragment>
            )
        } else {
            return <Fragment/>
        }
    }

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Talents'}/>
            <CardContent>
                {renderTable()}
                {renderButton()}
            </CardContent>
        </Card>
    )
}