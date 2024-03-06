import {useEffect, useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Button} from "@mui/material";
import Nemesis from "../../../../../models/actor/npc/Nemesis";
import Talent from "../../../../../models/Talent";
import TalentBackdrop from "../../../common/talent/TalentBackdrop";
import TalentService from "../../../../../services/TalentService";
import {renderSingleRowTableHeader} from "../../../../common/table/TableRenders";

interface RowProps {
    talent: Talent
    nemesis: Nemesis
}

function TalentNameRow(props: RowProps): JSX.Element {
    const {talent, nemesis} = props;
    const [openTalentBackDrop, setOpenTalentBackDrop] = useState(false)

    const addTalent = async () => {
        if (nemesis.talents.some(actorTalent => actorTalent.name === talent.name)) {
            nemesis.talents.forEach((actorTalent, index) => {
                if (talent.name === actorTalent.name) {
                    actorTalent.ranks = actorTalent.ranks + 1
                    nemesis.talents[index] = actorTalent
                }
            })
        } else {
            nemesis.talents.push({...talent, ranks: 1})
        }
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
    nemesis: Nemesis
}

export default function NemesisTalentSelectionTable(props: TableProps) {
    const {nemesis} = props
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
                        <TalentNameRow talent={talent} nemesis={nemesis}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}