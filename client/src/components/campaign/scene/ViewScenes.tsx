import {Card, CardContent, Table, TableContainer} from "@mui/material";
import CenteredCardHeaderWithDialog from "../../common/card/header/CenteredCardHeaderWithDialog";
import React, {useEffect, useState} from "react";
import Scene from "../../../models/campaign/Scene";
import Paper from "@mui/material/Paper";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {SingleActionTableCell} from "../../common/table/ActionsTableCell";
import {CampaignPath} from "../../../services/RootPath";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import SceneCreationDialog from "./SceneCreationDialog";
import SceneService from "../../../services/SceneService";

export default function ViewScenes() {
    const [scenes, setScenes] = useState<Scene[]>([]);
    const [openSceneDialog, setOpenSceneDialog] = useState(false);
    const headers = ['Name', 'View'];

    useEffect(() => {
        (async (): Promise<void> => {
            setScenes(await SceneService.getScenes());
        })()
    }, [setScenes])

    return (
        <Card>
            <CenteredCardHeaderWithDialog title={'Scenes'} onClick={() => setOpenSceneDialog(true)}
                                          buttonText={'Create Scene'}/>
            {openSceneDialog && <SceneCreationDialog open={openSceneDialog}
                                                     onClose={(): void => setOpenSceneDialog(false)}/>}
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {scenes.map((scene, index) => (
                                <TableRow key={index}>
                                    <TypographyCenterTableCell value={scene.name}/>
                                    <SingleActionTableCell name={scene.id} path={CampaignPath.Scene}/>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}