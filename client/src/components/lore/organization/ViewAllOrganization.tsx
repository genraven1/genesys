import {Organization} from "../../../models/lore/Organization";
import {useEffect, useState} from "react";
import * as React from "react";
import TableRow from "@mui/material/TableRow";
import {LorePath} from "../../../services/Path";
import LoreService from "../../../services/LoreService";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import ActionsTableCell from "../../common/table/ActionsTableCell";
import {GenesysDescriptionTypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import {renderHeaders} from "../../common/table/TableRenders";

interface RowProps {
    organization: Organization
}

function OrganizationRow(props: RowProps): JSX.Element {
    const {organization} = props

    return (
        <TableRow>
            <GenesysDescriptionTypographyCenterTableCell value={organization.name}/>
            <ActionsTableCell id={organization.name} path={LorePath.Organization}/>
        </TableRow>
    )
}

interface Props {
    path: LorePath
}

export function ViewAllOrganizations(props: Props): JSX.Element {
    const {path} = props
    const [organizations, setOrganizations] = useState<Organization[]>([])
    const headers = ['Name', 'View']

    useEffect(() => {
        (async (): Promise<void> => {
            const loreList = await LoreService.getAllLoreOfType(path)
            if (!loreList) {
                return
            }
            setOrganizations(loreList)
        })()
    }, [path])

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    {renderHeaders(headers)}
                </TableHead>
                <TableBody>
                    {organizations.map((organization: Organization) => (
                        <OrganizationRow key={organization.name} organization={organization}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}