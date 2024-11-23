import {Card, CardContent} from "@mui/material";
import CenteredCardHeaderWithDialog from "../../common/card/header/CenteredCardHeaderWithDialog";
import {useState} from "react";

export default function ViewScenes() {
    const [openSceneDialog, setOpenSceneDialog] = useState(false);

    return (
        <Card>
            <CenteredCardHeaderWithDialog title={'View All Scenes'} onClick={() => setOpenSceneDialog(true)}
                                          buttonText={'Create Scene'}/>
            <CardContent>

            </CardContent>
        </Card>
    )
}