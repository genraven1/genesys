import {useEffect, useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Button} from "@mui/material";
import Talent from "../../../../../models/Talent";
import Rival from "../../../../../models/actor/npc/Rival";
import TalentBackdrop from "../../../common/talent/TalentBackdrop";
import {renderSingleRowTableHeader} from "../../../../common/table/TableRenders";
import TalentService from "../../../../../services/TalentService";
import ActorService from "../../../../../services/ActorService";

interface RowProps {
    talent: Talent
    rival: Rival
}

function TalentNameRow(props: RowProps): JSX.Element {
    const {talent, rival} = props;
    const [openTalentBackDrop, setOpenTalentBackDrop] = useState(false)

    const addTalent = async () => {
        if (rival.talents.some(actorTalent => actorTalent.name === talent.name)) {
            rival.talents.forEach((actorTalent, index) => {
                if (talent.name === actorTalent.name) {
                    actorTalent.ranks = actorTalent.ranks + 1
                    rival.talents[index] = actorTalent
                }
            })
        } else {
            rival.talents.push({...talent, ranks: 1})
        }
        await ActorService.updateRival(rival.name, rival)
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
    rival: Rival
}

export default function RivalTalentSelectionTable(props: TableProps) {
    const {rival} = props
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
                        <TalentNameRow talent={talent} rival={rival}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}