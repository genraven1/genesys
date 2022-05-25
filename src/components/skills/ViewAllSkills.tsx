import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { forwardRef, Fragment, useEffect, useMemo, useState } from 'react';
import { Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import * as React from 'react';
import { LinkProps, Link } from "react-router-dom";
import Skill from "../../models/actor/Skill";
import SkillService from "../../services/SkillService";

function Row(props: { row: Skill }): JSX.Element {
    const { row } = props;
    const { pathname } = useLocation()
    const [open, setOpen] = useState(false);

    const renderLink = useMemo(() => forwardRef<any, Omit<LinkProps, 'to'>>((itemProps, ref): React.ReactElement => (
        <Link to={`${pathname}/${row.name}`} ref={ref} {...itemProps} />
    )),[pathname, row.name]);

    return (
        <Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} onClick={() => setOpen(!open)}>
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.characteristic}</TableCell>
                <TableCell>{row.active}</TableCell>
                <TableCell>
                    <Button component={renderLink}>Edit</Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Table size="small" aria-label="purchases">
                                <TableBody>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

export default function ViewAllSkills() {
    const [players, setSkills] = useState<Skill[]>([]);

    useEffect(() => {
        (async (): Promise<void> => {
            const playerList = await SkillService.getSkills();
            if (!playerList) { return; }
            setSkills(playerList);
        })();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell>Skill Name</TableCell>
                        <TableCell>Skill Type</TableCell>
                        <TableCell>Linked Characteristic</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>Edit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {players.map((row: Skill) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}