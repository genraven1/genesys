import {useEffect, useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Button} from "@mui/material";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import CampaignService from "../../../services/CampaignService";
import Skill from "../../../models/actor/Skill";
import SkillService from "../../../services/SkillService";
import SkillBackdrop from "../../skills/SkillBackdrop";

interface RowProps {
    skill: Skill
    campaign_name: string
}

function SkillNameRow(props: RowProps) {
    const {skill, campaign_name} = props;
    const [openSkillBackDrop, setOpenSkillBackDrop] = useState(false);

    const addSkill = async () => {
        await CampaignService.addCampaignSkill(campaign_name, skill);
    }

    return (
        <TableRow key={skill.name}>
            <TableCell>
                <Button onClick={(): void => setOpenSkillBackDrop(true)}>{skill.name}</Button>
                {openSkillBackDrop &&
                    <SkillBackdrop open={openSkillBackDrop} onClose={(): void => setOpenSkillBackDrop(false)}
                                   skill={skill}/>}
            </TableCell>
            <TableCell>
                <Button onClick={addSkill}>Add</Button>
            </TableCell>
        </TableRow>
    );
}

interface TableProps {
    campaign_name: string
}

export default function CampaignSkillSelectionTable(props: TableProps) {
    const {campaign_name} = props
    const [skills, setSkills] = useState<Skill[]>([])
    const headers = ['Name', 'Add']

    useEffect(() => {
        (async (): Promise<void> => {
            setSkills(await SkillService.getSkills())
        })()
    }, [setSkills]);

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderSingleRowTableHeader(headers)}
                <TableBody>
                    {skills.map((skill: Skill) => (
                        <SkillNameRow skill={skill} campaign_name={campaign_name}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}