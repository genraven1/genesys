import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import {ActorArmor, ArmorSlot, getArmorSlotOptions} from "../../../../../../models/equipment/Armor";
import ActorService from "../../../../../../services/ActorService";
import {renderSingleRowTableHeader} from "../../../../../common/table/TableRenders";
import {TypographyLeftTableCell} from "../../../../../common/table/TypographyTableCell";
import InputSelectField from "../../../../../common/InputSelectField";
import Minion from "../../../../../../models/actor/npc/Minion";

interface Props {
    open: boolean;
    onClose: () => void;
    minion: Minion
}

export default function MinionArmorEquipDialog(props: Props) {
    const {open, onClose, minion} = props;
    const headers = ['Name', 'Armor Slot']

    const onChange = async (value: ActorArmor) => {
        if (value.slot === ArmorSlot.None) {
            minion.armors.forEach((armor) => {
                if (armor.name === value.name) {
                    armor.slot = value.slot
                }
            })
        } else {
            minion.armors.forEach((armor) => {
                if (armor.name === value.name) {
                    armor.slot = value.slot
                } else {
                    armor.slot = ArmorSlot.None
                }
            })
        }
        await ActorService.updateMinion(minion.name, minion)
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle title={'Equip Armor'}/>
            <DialogContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {minion.armors.map((armor: ActorArmor) => (
                                <ArmorRow armor={armor} onChange={onChange}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}

interface RowProps {
    armor: ActorArmor
    onChange: (armor: ActorArmor) => void
}

function ArmorRow(props: RowProps) {
    const {armor, onChange} = props

    const onCommit = (value: string) => {
        armor.slot = value as ArmorSlot
        onChange(armor)
    }

    return (
        <TableRow key={armor.name}>
            <TypographyLeftTableCell value={armor.name}/>
            <InputSelectField defaultValue={armor.slot} options={getArmorSlotOptions()} onCommit={onCommit}/>
        </TableRow>
    )
}