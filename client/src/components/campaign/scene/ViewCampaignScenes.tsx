import {Button, Card, CardContent, Table, TableContainer, TableFooter} from "@mui/material";
import React, {useEffect, useState} from "react";
import Scene from "../../../models/campaign/Scene";
import Paper from "@mui/material/Paper";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {SingleActionTableCell} from "../../common/table/ActionsTableCell";
import {CampaignPath} from "../../../services/RootPath";
import AddIcon from "@mui/icons-material/Add";
import CenteredCardHeader from "../../common/card/header/CenteredCardHeader";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import CampaignService from "../../../services/CampaignService";

export default function ViewCampaignScenes() {
    const [scenes, setScenes] = useState<Scene[]>([]);
    const [openSceneDialog, setOpenSceneDialog] = useState(false);
    const headers = ['Name', 'View'];

    useEffect(() => {
        (async (): Promise<void> => {
            setScenes(await CampaignService.getCampaignScenes())
        })()
    }, [setScenes])

    return (
        <Card>
            <CenteredCardHeader title={'Scenes'}/>
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
                        <TableFooter>
                            <TableRow key={'Footer'}>
                                {/*<Button variant='contained' color='primary' onClick={addRow} startIcon={<AddIcon/>}>Add*/}
                                {/*    Scene</Button>*/}
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}