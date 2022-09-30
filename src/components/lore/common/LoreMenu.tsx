import {Button, Card, CardContent, CardHeader} from "@mui/material";
import {LoreType} from "../../../models/lore/Lore";
import {LorePath} from "../../../services/Path";
import * as React from "react";
import {useState} from "react";
import LoreCreationDialog from "./LoreCreationDialog";
import {ViewAllOrganizations} from "../organization/ViewAllOrganization";

export interface MenuProps {
    lore: LoreType
    path: LorePath
}

export default function LoreMenu(props: MenuProps): JSX.Element {
    const {lore,path} = props
    const [openLoreCreationDialog, setOpenLoreCreationDialog] = useState(false)

    const getLoreTable = (lore: LoreType): JSX.Element => {
        switch (lore) {
            case LoreType.ORGANIZATION:
                return <ViewAllOrganizations path={path} />
        }
    }

    return (
        <Card>
            <CardHeader style={{textAlign: 'center'}} title={lore} action={<Button color='primary' variant='contained' onClick={(): void => setOpenLoreCreationDialog(true)}>CREATE</Button>}/>
            {openLoreCreationDialog && <LoreCreationDialog open={openLoreCreationDialog} onClose={(): void => setOpenLoreCreationDialog(false)} lore={lore} path={path}/>}
            <CardContent>
                {getLoreTable(lore)}
            </CardContent>
        </Card>
    )
}