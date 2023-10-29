import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {renderHeaders} from "../../../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import Talent, {ActorTalent} from "../../../../models/Talent";
import * as React from "react";
import Minion from "../../../../models/actor/npc/Minion";
import {useLocation} from "react-router-dom";
import {Fragment, useState} from "react";
import {Button} from "@mui/material";
import TalentSelectionDialog from "../../common/talent/TalentSelectionDialog";
import GenesysDescriptionTypography from "../../../common/typography/GenesysDescriptionTypography";
import GenesysTalentTypography from "../../../common/typography/GenesysTalentTypography";
import {
    GenesysDescriptionTypographyCenterTableCell,
    TypographyCenterTableCell
} from "../../../common/table/TypographyTableCell";

interface TableProps {
    minion: Minion
}

export default function MinionTalentTable(props: TableProps) {
    const {minion} = props
    const headers = ['Name', 'Summary']
    const [openSelectTalentDialog, setOpenSelectTalentDialog] = useState(false)
    const pathname = useLocation().pathname

    const renderButton = (): JSX.Element => {
        if (pathname.endsWith('/edit')) {
            return (
                <Fragment>
                    <Button color='primary' variant='contained' onClick={(): void => setOpenSelectTalentDialog(true)}>Add Talent</Button>
                    {openSelectTalentDialog && <TalentSelectionDialog actor={minion} open={openSelectTalentDialog}
                                                                      onClose={(): void => setOpenSelectTalentDialog(false)}/>}
                </Fragment>
            )
        } else {
            return <Fragment/>
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={2} style={{textAlign: "center"}}>Talents</TableCell>
                    </TableRow>
                    <TableRow>
                        {renderHeaders(headers)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(minion?.talents!! || []).map((row: Talent) => (
                        <TalentRow key={row.name} talent={row}/>
                    ))}
                    {renderButton}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

interface Props {
    talent: Talent
    skillRanks?: number
}

function TalentRow(props: Props): JSX.Element {
    const {talent, skillRanks} = props

    return (
        <TableRow>
            <TypographyCenterTableCell value={talent.name}/>
            <GenesysDescriptionTypographyCenterTableCell value={talent.summary}/>
        </TableRow>
    )
}