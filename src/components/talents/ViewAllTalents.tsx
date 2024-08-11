import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Talent from '../../models/Talent';
import TalentService from '../../services/TalentService';
import {Fragment, useEffect, useState} from 'react';
import * as React from 'react';
import GenesysDescriptionTypography from "../common/typography/GenesysDescriptionTypography";
import {ViewActionTableCell} from "../common/table/ActionsTableCell";
import {RootPath} from "../../services/RootPath";
import {renderSingleRowTableHeader} from "../common/table/TableRenders";
import {Button, Card, CardContent, CardHeader} from "@mui/material";
import CreateTalentDialog from "./CreateTalentDialog";
import {TypographyCenterTableCell} from "../common/table/TypographyTableCell";

interface Props {
    talent: Talent
    columns: number
}

export function TalentRow(props: Props) {
    const {talent, columns} = props
    const [open, setOpen] = useState(false)

    const renderRanked = (): string => {
        return talent.ranked ? 'Yes' : 'No'
    }

    return (
        <Fragment>
            <TableRow onClick={() => setOpen(!open)}>
                <TypographyCenterTableCell value={talent.name}/>
                <TypographyCenterTableCell value={renderRanked()}/>
                <TypographyCenterTableCell value={talent.activation}/>
                <TypographyCenterTableCell value={talent.tier}/>
                <ViewActionTableCell id={talent.talent_id} path={RootPath.Talent}/>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={columns}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Table sx={{margin: 1}}>
                            <TableBody>
                                <GenesysDescriptionTypography text={talent.description}/>
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

export default function ViewAllTalents() {
    const [talents, setTalents] = useState<Talent[]>([])
    const [openTalentCreationDialog, setOpenTalentCreationDialog] = useState(false)
    const headers = ['Name', 'Ranked', 'Activation', 'Tier', 'View']

    useEffect(() => {
        (async (): Promise<void> => {
            setTalents(await TalentService.getTalents())
        })()
    }, [setTalents])

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'View All Talents'}
                action={<Button color='primary' variant='contained'
                                onClick={(): void => setOpenTalentCreationDialog(true)}>Create Talent</Button>}>
            </CardHeader>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {talents.map((talent: Talent) => (
                                <TalentRow key={talent.name} talent={talent} columns={headers.length}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {openTalentCreationDialog && <CreateTalentDialog open={openTalentCreationDialog}
                                                             onClose={(): void => setOpenTalentCreationDialog(false)}/>}
        </Card>
    );
}
