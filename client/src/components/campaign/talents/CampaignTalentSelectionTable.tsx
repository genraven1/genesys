import {useEffect, useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Button} from "@mui/material";
import Talent from "../../../models/Talent";
import TalentBackdrop from "../../actor/common/talent/TalentBackdrop";
import TalentService from "../../../services/TalentService";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import CampaignService from "../../../services/CampaignService";

interface RowProps {
    talent: Talent
    campaign_name: string
}

function TalentNameRow(props: RowProps) {
    const {talent, campaign_name} = props;
    const [openTalentBackDrop, setOpenTalentBackDrop] = useState(false);

    const addTalent = async () => {
        await CampaignService.addCampaignTalent(campaign_name,talent);
    }

    return (
        <TableRow key={talent.name}>
            <TableCell>
                <Button onClick={(): void => setOpenTalentBackDrop(true)}>{talent.name}</Button>
                {openTalentBackDrop &&
                    <TalentBackdrop open={openTalentBackDrop} onClose={(): void => setOpenTalentBackDrop(false)}
                                    talent={talent}/>}
            </TableCell>
            <TableCell>
                <Button onClick={addTalent}>Add</Button>
            </TableCell>
        </TableRow>
    );
}

interface TableProps {
    campaign_name: string
}

export default function CampaignTalentSelectionTable(props: TableProps) {
    const {campaign_name} = props
    const [talents, setTalents] = useState<Talent[]>([])
    const headers = ['Name', 'Add']

    useEffect(() => {
        (async (): Promise<void> => {
            setTalents(await TalentService.getTalents())
        })()
    }, [setTalents]);

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderSingleRowTableHeader(headers)}
                <TableBody>
                    {talents.map((talent: Talent) => (
                        <TalentNameRow talent={talent} campaign_name={campaign_name}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}