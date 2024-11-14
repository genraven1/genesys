import {useParams} from "react-router-dom";
import {Card, CardContent} from "@mui/material";
import CenteredCardHeader from "../../common/card/CenteredCardHeader";

export default function SessionPage() {
    const {name} = useParams<{ name: string }>();

    return (
        <Card>
            <CenteredCardHeader title={String(name)}/>
            <CardContent>

            </CardContent>
        </Card>
    )
}