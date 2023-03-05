import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Talent from '../../models/Talent';
import TalentService from '../../services/TalentService';
import {Fragment,useEffect,useState} from 'react';
import * as React from 'react';
import GenesysDescriptionTypography from "../common/typography/GenesysDescriptionTypography";
import ActionsTableCell from "../common/table/ActionsTableCell";
import {Path} from "../../services/Path";

function Row(props: { row: Talent }): JSX.Element {
    const {row} = props
    const [open,setOpen] = useState(false)

    const renderRanked = ():JSX.Element => {
        if(row?.ranked!! === undefined) {return <Fragment/>}
        let ranked = ''
        if(row?.ranked!!) {ranked = 'Yes'}
        else {ranked = 'No'}
        return <GenesysDescriptionTypography text={ranked}/>
    }

    return (
        <Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} onClick={() => setOpen(!open)}>
                <TableCell style={{textAlign:'center'}}>{row.name}</TableCell>
                <TableCell style={{textAlign:'center'}}>{renderRanked()}</TableCell>
                <TableCell style={{textAlign:'center'}}>{row.activation}</TableCell>
                <TableCell style={{textAlign:'center'}}>{row.tier}</TableCell>
                <ActionsTableCell name={String(row.id)} path={Path.Talent}/>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Table size="small" aria-label="purchases">
                                <TableBody>
                                    <GenesysDescriptionTypography text={row.description}/>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

export default function AllTalentsView() {
    const [talents, setTalents] = useState<Talent[]>([])

    useEffect(() => {
        (async (): Promise<void> => {
            const talentList = await TalentService.getTalents()
            if (!talentList) {return}
            setTalents(talentList)
        })()
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{textAlign:'center'}}>Talent Name</TableCell>
                        <TableCell style={{textAlign:'center'}}>Ranked</TableCell>
                        <TableCell style={{textAlign:'center'}}>Activation</TableCell>
                        <TableCell style={{textAlign:'center'}}>Tier</TableCell>
                        <TableCell style={{textAlign:'center'}}>View</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {talents.map((row: Talent) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
