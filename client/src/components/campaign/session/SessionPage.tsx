import {useParams} from "react-router-dom";
import {Card} from "@mui/material";
import CenteredCardHeader from "../../common/card/CenteredCardHeader";

export default function SessionPage() {
    const {id} = useParams<{ id: string }>();

    return (
        <Card>
            <CenteredCardHeader title={String(id)}/>
        </Card>
    )
}