import {useEffect, useState} from "react";
import TalentService from "../../../../services/TalentService";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Button} from "@mui/material";
import TalentBackdrop from "./TalentBackdrop";
import Talent, {ActorTalent} from "../../../../models/Talent";
import ActorService from "../../../../services/ActorService";
import Actor, {ActorType} from "../../../../models/actor/Actor";
import {renderHeaders} from "../../../common/table/TableRenders";

interface RowProps {
    talent: Talent
    actor: Actor
}

function TalentNameRow(props: RowProps): JSX.Element {
    const {talent, actor} = props;
    const [openTalentBackDrop, setOpenTalentBackDrop] = useState(false)

    const addTalent = async () => {
        switch (actor.type) {
            case ActorType.Nemesis:
                await ActorService.addNemesisTalent(actor.name, {...talent!!} as ActorTalent)
                break
            case ActorType.Rival:
                await ActorService.addRivalTalent(actor.name, {...talent!!} as ActorTalent)
                break
            case ActorType.Player:
                await ActorService.addPlayerTalent(actor.name, {...talent} as ActorTalent)
                break
        }
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
    actor: Actor
}

export default function TalentSelectionTable(props: TableProps) {
    const {actor} = props
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
                <TableHead>
                    {renderHeaders(headers)}
                </TableHead>
                <TableBody>
                    {talents.map((talent: Talent) => (
                        <TalentNameRow talent={talent} actor={actor}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}