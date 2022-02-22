import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from 'axios';
import Talent from '../models/Talent';

// function createData(
//     name: string,
//     ranked: string,
//     activation: string,
//     tier: number,
//     description: string,
// ) {
//     return {
//         name,
//         ranked,
//         activation,
//         tier,
//         description,
//     };
// }

// const rows = [
//     createData('Durable', 'Yes', 'Passive', 1, 'Your character reduces any Critical Injury result they suffer by 10 per rank of Durable, to a minimum of 01.'),
//     createData('Sharp Tongue', 'Yes', 'Passive', 2, 'Your character reduces the number of (Advantages) they must spend to inflict a critical remark in a social encounter by their ranks in Sharp Tongue, to a minimum of one (Advantage). (See page 123 of the Genesys Core Rulebook).'),
//     createData('Duelist', 'No', 'Passive', 2, 'Your character adds (1 Boost Die) to their melee combat checks while engaged with a single opponent. Your character adds (1 Setback Die) to their melee combat checks while engaged with three or more opponents'),
//     createData('Enduring', 'Yes', 'Passive', 4, 'Each rank of Enduring increases your character\'s soak value by one.'),
//     createData('Precise Archery', 'No', 'Passive', 3, 'When making a Ranged combat check targeting a character engaged with one of your character\'s allies, downgrade the difficulty of the check once (thus negating the penalty for shooting at engaged targets).'),
// ];

function Row(props: { row: Talent }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

return (
    <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
                {row.name}
            </TableCell>
            <TableCell>{row.ranked}</TableCell>
            <TableCell>{row.activation}</TableCell>
            <TableCell>{row.tier}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                        <Table size="small" aria-label="purchases">
                            <TableBody>
                                {row.description}
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    </React.Fragment>
);
}

export default function AllTalentsView() {
    const [talents, setTalents] = React.useState([]);

    // React.useEffect(() => {
    //     async () => {
    //         await axios.get('http://localhost:8080/talents')
    //         .then(function (response) {
    //             setTalents(response.data);
    //             console.log(talents);
    //         }).catch(function (error) {
    //             setTalents([]);
    //             console.log(error);
    //         })
    //     };
    // })

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell>Talent Name</TableCell>
                        <TableCell>Ranked</TableCell>
                        <TableCell>Activation</TableCell>
                        <TableCell>Tier</TableCell>
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
