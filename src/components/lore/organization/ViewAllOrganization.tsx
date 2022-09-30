import Organization from "../../../models/lore/Organization";
import {Link, LinkProps, useLocation} from "react-router-dom";
import {forwardRef, Fragment, useEffect, useMemo, useState} from "react";
import * as React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Button} from "@mui/material";
import {LorePath} from "../../../services/Path";
import LoreService from "../../../services/LoreService";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";

function OrganizationRow(props: { row: Organization }): JSX.Element {
    const { row } = props;
    const { pathname } = useLocation()

    const renderLink = useMemo(() => forwardRef<any, Omit<LinkProps, 'to'>>((itemProps, ref): React.ReactElement => (
        <Link to={`${pathname}${row.name}/edit`} ref={ref} {...itemProps} />
    )),[pathname, row.name])

    return (
        <Fragment>
            <TableRow>
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell>
                    <Button component={renderLink}>Edit</Button>
                </TableCell>
            </TableRow>
        </Fragment>
    )
}

interface Props {
    path: LorePath
}

export function ViewAllOrganizations(props: Props): JSX.Element {
    const {path} = props
    const [organizations, setOrganizations] = useState<Organization[]>([]);

    useEffect(() => {
        (async (): Promise<void> => {
            const loreList = await LoreService.getAllLoreOfType(path)
            if (!loreList) { return }
            setOrganizations(loreList)
        })()
    }, [path])

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {organizations.map((row: Organization) => (
                        <OrganizationRow key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}