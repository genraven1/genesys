import {useEffect, useState} from "react";
import TalentService from "../../services/TalentService";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Button} from "@mui/material";
import TalentBackdrop from "./TalentBackdrop";
import Talent from "../../models/Talent";
import ActorService from "../../services/ActorService";
import Actor, {ActorTalent} from "../../models/actor/Actor";

interface RowProps {
    id: number
   actor: Actor
}

function TalentNameRow(props: RowProps): JSX.Element {
    const {id, actor} = props;
    const [talent, setTalent] = useState<Talent>()
    const [openTalentBackDrop, setOpenTalentBackDrop] = useState(false)

    useEffect(() => {
        if (!id) {return}
        (async (): Promise<void> => {
            const talentData = await TalentService.getTalent(id)
            if (!talentData) { return }
            setTalent(talentData)
        })()
    }, [id])

    const addTalent = async () => {
        await ActorService.addNemesisTalent(actor.name, {...talent!!} as ActorTalent)
    }

    return (
        <TableRow>
            <TableCell>
                <Button onClick={(): void => setOpenTalentBackDrop(true)}>{talent?.name!!}</Button>
                {openTalentBackDrop && <TalentBackdrop open={openTalentBackDrop} onClose={(): void => setOpenTalentBackDrop(false)} talent={talent!!}/>}
            </TableCell>
            <TableCell>
                <Button onClick={addTalent}>Add</Button>
            </TableCell>
        </TableRow>
    )
}

interface TableProps {
    actor: Actor
}

export default function TalentSelectionTable(props: TableProps) {
    const {actor} = props
    const [names, setNames] = useState<number[]>([])

    useEffect(() => {
        (async (): Promise<void> => {
            const talentList = await TalentService.getTalentIds()
            if (!talentList) { return }
            setNames(talentList)
        })()
    }, [setNames])

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell>Talent Name</TableCell>
                        <TableCell>Add</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {names.map((id: number) => (
                        <TalentNameRow id={id} actor={actor}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}