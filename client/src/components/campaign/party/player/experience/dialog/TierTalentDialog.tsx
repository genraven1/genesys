import {Dialog, DialogContent} from "@mui/material";
import Player from "../../../../../../models/actor/player/Player";
import CenteredDialogTitle from "../../../../../common/dialog/CenteredDialogTitle";
import Talent, {Tier} from "../../../../../../models/Talent";
import {useEffect, useState} from "react";
import CampaignService from "../../../../../../services/CampaignService";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {renderSingleRowTableHeader} from "../../../../../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell} from "../../../../../common/table/TypographyTableCell";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";

interface Props {
    open: boolean
    onClose: () => void
    currentPlayer: Player
    tier: Tier
}

export default function TierTalentDialog(props: Props) {
    const {open, onClose, currentPlayer, tier} = props;
    const [talents, setTalents] = useState<Talent[]>([]);
    const playerTalents = currentPlayer.talents.filter(talent => talent.tier === tier);
    let headers = ['Name'];

    useEffect(() => {
        (async (): Promise<void> => {
            setTalents(await CampaignService.getCampaignTierTalents(tier));
        })();
    }, [setTalents, tier]);

    const filterTalents = (): Talent[] => {
        const filteredPlayerTalents = new Set(playerTalents.map(talent => talent.id));
        return talents.filter(talent => !filteredPlayerTalents.has(talent.id));
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <CenteredDialogTitle title={'Talents'}/>
            <DialogContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {filterTalents().map((talent: Talent) => (
                                <TableRow key={talent.name}>
                                    <TypographyCenterTableCell value={talent.name}/>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
        </Dialog>
    );
}