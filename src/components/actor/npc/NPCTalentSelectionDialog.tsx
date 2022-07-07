import {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Nemesis from "../../../models/actor/npc/Nemesis";
import ActorService from "../../../services/ActorService";
import {DefaultTalent} from "../../../models/Talent";
import {ActorTalent} from "../../../models/actor/Actor";
import TalentSelectionTable from "./TalentSelectionTable";

interface Props {
    nemesis: Nemesis
    open: boolean
    onClose: () => void
}

export default function NPCTalentSelectionDialog(props: Props) {
    const {nemesis, open, onClose} = props;
    const [talent, setTalent] = useState(DefaultTalent.create)

    const addTalent = async (): Promise<void> => {
        const actorTalent = {...talent, ranks: 0} as ActorTalent
        await ActorService.addNemesisTalent(nemesis.name, actorTalent)
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                Add Talent
            </DialogTitle>
            <DialogContent>
                <TalentSelectionTable />
            </DialogContent>
            <DialogActions>
                <Button color='primary' variant='contained' onClick={addTalent}>ADD</Button>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}