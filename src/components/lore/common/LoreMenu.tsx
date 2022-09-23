import {Card, CardActionArea, CardHeader} from "@mui/material";
import {ViewAllLoreOfType} from "./ViewAllLore";
import {Lore} from "../../../models/lore/Lore";

export interface Props {
    lore: Lore
}

export default function LoreMenu(props: Props): JSX.Element {
    const {lore} = props
    return (
        <Card>
            <CardHeader style={{textAlign: 'center'}} title={lore}/>
            <CardActionArea>
                <ViewAllLoreOfType lore={lore} />
            </CardActionArea>
        </Card>
    )
}