import {Fragment, useState} from "react";
import Scene from "../../../models/campaign/Scene";
import {Button, Card, CardContent, CardHeader, Divider} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import ActionsTableCell from "../../common/table/ActionsTableCell";
import {Path} from "../../../services/Path";
import {useLocation} from "react-router-dom";
import SceneDialog from "./SceneDialog";

interface RowProps {
    scene: Scene
}

function Row(props: RowProps): JSX.Element {
    const {scene} = props

    return (
        <TableRow>
            <TypographyCenterTableCell value={scene.name}/>
            <ActionsTableCell name={''} path={Path.Setting}/>
        </TableRow>
    )
}

interface Props {
    scenes: Scene[]
    campaignName: string
    sessionName: string
}

export default function ViewAllScenes(props: Props): JSX.Element {
    const {scenes, campaignName, sessionName} = props
    const [openSceneCreationDialog, setOpenSceneCreationDialog] = useState(false)
    const headers = ['Name', 'View']
    const pathname = useLocation().pathname

    const renderButton = (): JSX.Element => {
        if (pathname.endsWith('/edit')) {
            return (
                <Fragment>
                    <Button color='primary' variant='contained'
                            onClick={(): void => setOpenSceneCreationDialog(true)}>Create Session</Button>
                    {openSceneCreationDialog && <SceneDialog open={openSceneCreationDialog}
                                                             onClose={(): void => setOpenSceneCreationDialog(false)}
                                                             campaignName={campaignName} sessionName={sessionName}/>}
                </Fragment>
            )
        } else {
            return <Fragment/>
        }
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'View All Scenes'}
                action={renderButton()}>
            </CardHeader>
            <Divider/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {scenes.map((scene: Scene) => (
                                <Row key={scene.name} scene={scene}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}