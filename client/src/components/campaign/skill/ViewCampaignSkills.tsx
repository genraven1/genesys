import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from 'react';
import * as React from 'react';
import {Button, Card, CardContent, CardHeader} from "@mui/material";
import CampaignService from "../../../services/CampaignService";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import CampaignSkillSelectionDialog from "./CampaignSkillSelectionDialog";
import Skill from "../../../models/actor/Skill";

interface TableProps {
    campaign_name: string
}

export default function ViewCampaignSkills(props: TableProps) {
    const {campaign_name} = props
    const [skills, setSkills] = useState<Skill[]>([])
    const [openSkillAdditionDialog, setOpenSkillAdditionDialog] = useState(false)
    const headers = ['Name', 'Characteristic', 'Type']

    useEffect(() => {
        (async (): Promise<void> => {
            setSkills(await CampaignService.getCampaignSkills(campaign_name))
        })()
    }, [setSkills, campaign_name])

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'Campaign Skills'}
                action={<Button color='primary' variant='contained'
                                onClick={(): void => setOpenSkillAdditionDialog(true)}>Add Skill</Button>}>
            </CardHeader>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {skills.sort((a, b) => a.name.localeCompare(b.name)).map((skill: Skill) => (
                                <TableRow key={skill.name}>
                                    <TypographyCenterTableCell value={skill.name}/>
                                    <TypographyCenterTableCell value={skill.characteristic}/>
                                    <TypographyCenterTableCell value={skill.type}/>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {openSkillAdditionDialog && <CampaignSkillSelectionDialog open={openSkillAdditionDialog}
                                                                      onClose={(): void => setOpenSkillAdditionDialog(false)} campaign_name={campaign_name}/>}
        </Card>
    );
}