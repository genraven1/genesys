import {Button, Card, CardActionArea, CardHeader} from "@mui/material";
import {ViewAllLoreOfType} from "./ViewAllLore";
import {Lore} from "../../../models/lore/Lore";
import {useNavigate} from "react-router-dom";
import {LorePath} from "../../../services/Path";
import * as React from "react";

export interface MenuProps {
    lore: Lore
    path: LorePath
}

export default function LoreMenu(props: MenuProps): JSX.Element {
    const {lore,path} = props
    let navigate = useNavigate()

    const onCreate = () => {
        navigate(path + 'create')
    }

    return (
        <Card>
            <CardHeader style={{textAlign: 'center'}} title={lore} action={<Button color='primary' variant='contained' onClick={onCreate}>CREATE</Button>}/>
            <CardActionArea>
                <ViewAllLoreOfType lore={lore} />
            </CardActionArea>
        </Card>
    )
}