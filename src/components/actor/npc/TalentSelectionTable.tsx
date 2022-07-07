import {Fragment, useEffect, useState} from "react";
import TalentService from "../../../services/TalentService";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Button} from "@mui/material";
import TalentBackdrop from "./TalentBackdrop";
import Talent from "../../../models/Talent";
import Nemesis from "../../../models/actor/npc/Nemesis";
import ActorService from "../../../services/ActorService";
import {ActorTalent} from "../../../models/actor/Actor";

interface RowProps {
    name: string
   nemesis: Nemesis
}

function TalentNameRow(props: RowProps): JSX.Element {
    const {name, nemesis} = props;
    const [talent, setTalent] = useState<Talent>()
    const [openTalentBackDrop, setOpenTalentBackDrop] = useState(false);

    useEffect(() => {
        if (!name) {
            return;
        }
        (async (): Promise<void> => {
            const talentData = await TalentService.getTalent(name);
            if (!talentData) { return; }
            setTalent(talentData)
        })();
    }, [name])

    const addTalent = async () => {
        await ActorService.addNemesisTalent(nemesis.name, {...talent!!} as ActorTalent)
    }

    return (
        <Fragment>
            <TableRow>
                <TableCell>
                    <Button onClick={(): void => setOpenTalentBackDrop(true)}>{name}</Button>
                    {openTalentBackDrop && <TalentBackdrop open={openTalentBackDrop} onClose={(): void => setOpenTalentBackDrop(false)} talent={talent!!}/>}
                </TableCell>
                <TableCell>
                    <Button onClick={addTalent}>Add</Button>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

export default function TalentSelectionTable(props: {nemesis: Nemesis}) {
    const {nemesis} = props
    const [names, setNames] = useState<string[]>([]);

    useEffect(() => {
        (async (): Promise<void> => {
            const talentList = await TalentService.getTalentNames();
            if (!talentList) { return; }
            setNames(talentList);
        })();
    }, []);

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
                    {names.map((name: string) => (
                        <TalentNameRow name={name} nemesis={nemesis}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}