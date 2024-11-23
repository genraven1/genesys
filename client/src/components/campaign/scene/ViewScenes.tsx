import {Button, Card, CardContent, Table, TableContainer, TableFooter} from "@mui/material";
import CenteredCardHeaderWithDialog from "../../common/card/header/CenteredCardHeaderWithDialog";
import React, {useState} from "react";
import Scene from "../../../models/campaign/Scene";
import Paper from "@mui/material/Paper";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {SingleActionTableCell} from "../../common/table/ActionsTableCell";
import {CampaignPath} from "../../../services/RootPath";
import AddIcon from "@mui/icons-material/Add";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";

interface Props {
    scenes: Scene[]
}

export default function ViewScenes(props: Props) {
    const {scenes} = props;
    const [openSceneDialog, setOpenSceneDialog] = useState(false);
    const headers = ['Name', 'View'];

    return (
        <Card>
            <CenteredCardHeaderWithDialog title={'Scenes'} onClick={() => setOpenSceneDialog(true)}
                                          buttonText={'Add Scene'}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {scenes.map((scene, index) => (
                                <TableRow key={index}>
                                    <TypographyCenterTableCell value={scene.name}/>
                                    <SingleActionTableCell name={scene.id} path={CampaignPath.Session}/>
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