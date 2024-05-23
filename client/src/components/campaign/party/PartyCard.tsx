import Party from "../../../models/campaign/Party";
import {Button, Card, CardContent, CardHeader} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import ActionsTableCell from "../../common/table/ActionsTableCell";
import {ActorPath} from "../../../services/Path";
import TableRow from "@mui/material/TableRow";
import Character from "../../../models/character/Character";

interface Props {
    party: Party
}

export default function PartyCard(props: Props) {
    const {party} = props;
    const headers = ['Name', 'View']

    const renderTableBody = () => {
        return (
            <TableBody>
                {party.characters.map((player: Character) => (
                    <TableRow key={player.name}>
                        <TypographyCenterTableCell value={player.name}/>
                        <ActionsTableCell name={player.name} path={ActorPath.Player}/>
                    </TableRow>
                ))}
            </TableBody>
        )
    }

    return (
        <Card sx={{"width": 1}}>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'Party'}
                action={<Button color='primary' variant='contained'>Import Player</Button>}>
            </CardHeader>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        {renderTableBody()}
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}