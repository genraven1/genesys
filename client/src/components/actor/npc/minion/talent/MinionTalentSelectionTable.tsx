import {useEffect, useState} from "react";
import TalentService from "../../../../../services/TalentService";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Button} from "@mui/material";
import TalentBackdrop from "../../../../talents/TalentBackdrop";
import Talent from "../../../../../models/Talent";
import {renderSingleRowTableHeader} from "../../../../common/table/TableRenders";
import Minion from "../../../../../models/actor/npc/Minion";
import ActorService from "../../../../../services/ActorService";

interface RowProps {
    talent: Talent
    minion: Minion
}

function TalentNameRow(props: RowProps): JSX.Element {
    const {talent, minion} = props;
    const [openTalentBackDrop, setOpenTalentBackDrop] = useState(false)

    const addTalent = async () => {
        minion.talents.push({...talent, group: true})
        await ActorService.updateMinion(minion.name, minion)
    }

    return (
        <TableRow>
            <TableCell>
                <Button onClick={(): void => setOpenTalentBackDrop(true)}>{talent?.name!!}</Button>
                {openTalentBackDrop &&
                    <TalentBackdrop open={openTalentBackDrop} onClose={(): void => setOpenTalentBackDrop(false)}
                                    talent={talent!!}/>}
            </TableCell>
            <TableCell>
                <Button onClick={addTalent}>Add</Button>
            </TableCell>
        </TableRow>
    )
}

interface TableProps {
    minion: Minion
}

export default function MinionTalentSelectionTable(props: TableProps) {
    const {minion} = props
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
                        <TalentNameRow talent={talent} minion={minion}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}