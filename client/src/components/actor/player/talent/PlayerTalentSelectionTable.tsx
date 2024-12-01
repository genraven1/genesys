import {useEffect, useState} from "react";
import TalentService from "../../../../services/TalentService";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Button} from "@mui/material";
import Talent from "../../../../models/Talent";
import ActorService from "../../../../services/actor/ActorService";
import {renderSingleRowTableHeader} from "../../../common/table/TableRenders";
import TalentBackdrop from "../../../talents/TalentBackdrop";
import Player from "../../../../models/actor/player/Player";

interface RowProps {
    talent: Talent
    player: Player
}

function TalentNameRow(props: RowProps): JSX.Element {
    const {talent, player} = props;
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
        await ActorService.updatePlayer(player)
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

interface TableProps {
    player: Player
}

export default function PlayerTalentSelectionTable(props: TableProps) {
    const {player} = props
    const [talents, setTalents] = useState<Talent[]>([])
    const headers = ['Name', 'Add']

    useEffect(() => {
        (async (): Promise<void> => {
            const talentList = await TalentService.getTalents()
            if (!talentList) {
                return
            }
            setTalents(talentList)
        })()
    }, [setTalents])

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderSingleRowTableHeader(headers)}
                <TableBody>
                    {talents.map((talent: Talent) => (
                        <TalentNameRow talent={talent} player={player}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}