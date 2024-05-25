import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {renderSingleRowTableHeader} from "../../../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import Talent from "../../../../models/Talent";
import {useEffect, useState} from "react";
import Player from "../../../../models/actor/player/Player";
import ActorService from "../../../../services/ActorService";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Button} from "@mui/material";
import TalentBackdrop from "../../../actor/common/talent/TalentBackdrop";
import Campaign from "../../../../models/campaign/Campaign";

interface RowProps {
    campaign: Campaign
    player: Player
}

function AddPlayerToCampaign(props: RowProps): JSX.Element {
    const {campaign, player} = props;
    const [openTalentBackDrop, setOpenTalentBackDrop] = useState(false)

    const addTalent = async () => {
        if (player.talents.some(actorTalent => actorTalent.name === talent.name)) {
            player.talents.forEach((actorTalent, index) => {
                if (talent.name === actorTalent.name) {
                    actorTalent.ranks = actorTalent.ranks + 1
                    player.talents[index] = actorTalent
                }
            })
        } else {
            player.talents.push({...talent, ranks: 1})
        }
        await ActorService.updatePlayer(player.name, player)
    }

    return (
        <TableRow>
            <TableCell>
                <Button onClick={(): void => setOpenTalentBackDrop(true)}>{talent.name}</Button>
                {openTalentBackDrop &&
                    <TalentBackdrop open={openTalentBackDrop} onClose={(): void => setOpenTalentBackDrop(false)}
                                    talent={talent}/>}
            </TableCell>
            <TableCell>
                <Button onClick={addTalent}>Add</Button>
            </TableCell>
        </TableRow>
    )
}

interface Props {
    campaign: Campaign
}

export default function PlayerSelectionTable(props: Props) {
    const {campaign} = props
    const headers = ['Name', 'Add']
    const [players, setPlayers] = useState<Player[]>([])

    useEffect(() => {
        (async (): Promise<void> => {
            const playerList = await ActorService.getPlayers()
            if (!playerList) {
                return
            }
            setPlayers(playerList)
        })()
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderSingleRowTableHeader(headers)}
                <TableBody>
                    {players.map((player: Player) => (
                        <AddPlayerToCampaign campaign={campaign} player={player}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}