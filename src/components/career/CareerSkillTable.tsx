import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

export default function CareerSkillTable(): JSX.Element {

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
                </TableBody>
            </Table>
        </TableContainer>
        )
}