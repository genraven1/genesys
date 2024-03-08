import {Button, Card, CardContent, CardHeader} from "@mui/material";
import * as React from "react";
import SettingDialog from "../setting/SettingDialog";
import {useState} from "react";

export default function SceneDashboard(): JSX.Element {
    const [openSceneCreationDialog, setOpenSceneCreationDialog] = useState(false)

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'Scene MainDashboard'}
                action={<Button color='primary' variant='contained'
                                onClick={(): void => setOpenSceneCreationDialog(true)}>Create Scene</Button>}>
            </CardHeader>
            {openSceneCreationDialog &&
                <SettingDialog open={openSceneCreationDialog} onClose={(): void => setOpenSceneCreationDialog(false)}/>}
            <CardContent>

            </CardContent>
        </Card>
    )
}