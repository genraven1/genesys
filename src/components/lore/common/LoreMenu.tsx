import {Button, Card, CardActionArea, CardHeader} from "@mui/material";
import {ViewAllLoreOfType} from "./ViewAllLore";
import {Lore} from "../../../models/lore/Lore";
import {useNavigate} from "react-router-dom";
import {LorePath} from "../../../services/Path";

export interface MenuProps {
    lore: Lore
    path: LorePath
}

export default function LoreMenu(props: MenuProps): JSX.Element {
    const {lore,path} = props

    return (
        <Card>
            <CardHeader style={{textAlign: 'center'}} title={lore}/>
            <CardActionArea>
                <ViewAllLoreOfType lore={lore} />
            </CardActionArea>
        </Card>
    )
}

function CreateButton(): JSX.Element {
    let navigate = useNavigate()

    const onCreate = (path: LorePath) => {
        navigate(path + 'create')
    }
    return (
        <Button></Button>
    )
}