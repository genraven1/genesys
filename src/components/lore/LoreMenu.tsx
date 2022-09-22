import {Button, Card, CardActionArea, CardHeader} from "@mui/material";

export interface Props {
    title: string
}

export default function LoreMenu(props: Props): JSX.Element {

    return (
        <Card>
            <CardHeader style={{textAlign: 'center'}} title={props.title}/>
            <CardActionArea>

            </CardActionArea>
        </Card>
    )
}