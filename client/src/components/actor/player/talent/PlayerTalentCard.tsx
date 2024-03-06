import {Button, Card, CardContent} from "@mui/material";
import CenteredCardHeader from "../../../common/card/CenteredCardHeader";
import Player from "../../../../models/actor/player/Player";
import {Fragment, useState} from "react";
import {useLocation} from "react-router-dom";
import GenesysDescriptionTypography from "../../../common/typography/GenesysDescriptionTypography";
import PlayerTalentTable from "./PlayerTalentTable";
import PlayerTalentSelectionDialog from "./PlayerTalentSelectionDialog";

interface Props {
    player: Player
}

export default function PlayerTalentCard(props: Props): JSX.Element {
    const {player} = props
    const [openSelectTalentDialog, setOpenSelectTalentDialog] = useState(false)
    const pathname = useLocation().pathname

    const renderTable = (): JSX.Element => {
        if (player.talents == undefined || player.talents.length === 0) {
            return <GenesysDescriptionTypography text={'None'}/>
        }
        return <PlayerTalentTable player={player} />
    }

    const renderButton = (): JSX.Element => {
        if (pathname.endsWith('/edit')) {
            return (
                <Fragment>
                    <Button color='primary' variant='contained' onClick={(): void => setOpenSelectTalentDialog(true)}>Add Talent</Button>
                    {openSelectTalentDialog && <PlayerTalentSelectionDialog player={player} open={openSelectTalentDialog}
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