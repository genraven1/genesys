import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {renderSingleRowTableHeader} from "../../../../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import {ActorArmor, ArmorSlot, getArmorSlotOptions} from "../../../../../models/equipment/Armor";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import {TypographyLeftTableCell} from "../../../../common/table/TypographyTableCell";
import InputSelectField from "../../../../common/InputSelectField";
import Player from "../../../../../models/actor/player/Player";
import ActorService from "../../../../../services/actor/ActorService";

interface Props {
    open: boolean;
    onClose: () => void;
    player: Player
}

export default function PlayerArmorEquipDialog(props: Props) {
    const {open, onClose, player} = props;
    const headers = ['Name', 'Armor Slot']

    const onChange = async (value: ActorArmor) => {
        if (value.slot === ArmorSlot.None) {
            player.armors.forEach((armor) => {
                if (armor.name === value.name) {
                    armor.slot = value.slot
                }
            })
        } else {
            player.armors.forEach((armor) => {
                if (armor.name === value.name) {
                    armor.slot = value.slot
                } else {
                    armor.slot = ArmorSlot.None
                }
            })
        }
        await ActorService.updatePlayer(player)
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle title={'Equip Armor'}/>
            <DialogContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {player.armors.map((armor: ActorArmor) => (
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