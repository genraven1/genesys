// import {useEffect, useState} from "react";
// import Scene from "../../../models/campaign/Scene";
// import {Button, Card, CardContent, CardHeader, Divider} from "@mui/material";
// import TableContainer from "@mui/material/TableContainer";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";
// import TableBody from "@mui/material/TableBody";
// import SettingDialog from "../../setting/SettingDialog";
// import * as React from "react";
// import CampaignService from "../../../services/CampaignService";
// import {renderHeaders} from "../../common/table/TableRenders";
// import ActionsTableCell from "../../common/table/ActionsTableCell";
// import {Path} from "../../../services/Path";
//
// interface Props {
//     scene: Scene
// }
//
// function Row(props: Props): JSX.Element {
//     const {scene} = props
//
//     return (
//         <TableRow>
//             <TypographyCenterTableCell value={scene.name}/>
//             <TypographyCenterTableCell value={String(scene.actors.length)}/>
//             <ActionsTableCell id={String(scene.id)} path={Path.Setting}/>
//         </TableRow>
//     )
// }
//
// export default function ViewAllScenes(): JSX.Element {
//     const [scenes, setScenes] = useState<Scene[]>([])
//     const [openSceneCreationDialog, setOpenSceneCreationDialog] = useState(false)
//     const headers = ['Name', 'Number of Actors', 'View']
//
//     useEffect(() => {
//         (async (): Promise<void> => {
//             const sceneList = await CampaignService.getScenes()
//             if (!sceneList) { return }
//             setScenes(sceneList)
//         })()
//     }, [])
//
//     return (
//         <Card>
//             <CardHeader
//                 style={{textAlign: 'center'}}
//                 title={'View All Scenes'}
//                 action={<Button color='primary' variant='contained' onClick={(): void => setOpenSceneCreationDialog(true)}>Create Scene</Button>}>
//             </CardHeader>
//             <Divider />
//             <CardContent>
//                 <TableContainer component={Paper}>
//                     <Table aria-label="collapsible table">
//                         <TableHead>
//                             {renderHeaders(headers)}
//                         </TableHead>
//                         <TableBody>
//                             {scenes.map((scene: Scene) => (
//                                 <Row key={scene.name} scene={scene} />
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </CardContent>
//             {openSceneCreationDialog && <SettingDialog open={openSceneCreationDialog} onClose={(): void => setOpenSceneCreationDialog(false)}/>}
//         </Card>
//     )
// }