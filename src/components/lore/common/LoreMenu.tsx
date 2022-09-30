import {Button, Card, CardActionArea, CardHeader} from "@mui/material";
import {ViewAllLoreOfType} from "./ViewAllLore";
import {Lore} from "../../../models/lore/Lore";
import {LorePath} from "../../../services/Path";
import * as React from "react";
import {useState} from "react";
import LoreCreationDialog from "./LoreCreationDialog";

export interface MenuProps {
    lore: Lore
    path: LorePath
}

export default function LoreMenu(props: MenuProps): JSX.Element {
    const {lore,path} = props
    const [openLoreCreationDialog, setOpenLoreCreationDialog] = useState(false);

    return (
        <Card>
            <CardHeader style={{textAlign: 'center'}} title={lore} action={<Button color='primary' variant='contained' onClick={(): void => setOpenLoreCreationDialog(true)}>CREATE</Button>}/>
            {openLoreCreationDialog && <LoreCreationDialog open={openLoreCreationDialog} onClose={(): void => setOpenLoreCreationDialog(false)} lore={lore} path={path}/>}
            <CardActionArea>
                <ViewAllLoreOfType lore={lore} />
            </CardActionArea>
        </Card>
    )
}