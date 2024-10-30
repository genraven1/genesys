import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import {renderSingleRowTableHeader} from "../../../../common/table/TableRenders";
import {TypographyLeftTableCell} from "../../../../common/table/TypographyTableCell";
import {WeaponSlotTableCell} from "../../../../common/table/EquipmentSlotTableCell";
import {ActorWeapon, WeaponSlot} from "../../../../../models/equipment/Weapon";

interface Props {
    weapons: ActorWeapon[]
    open: boolean;
    updateWeapons: (weapons: ActorWeapon[]) => void
    onClose: () => void;
}

export default function WeaponEquipDialog(props: Props) {
    const {weapons, open, updateWeapons, onClose} = props;
    const headers = ['Name', 'Armor Slot'];

    const onChange = async (value: ActorWeapon) => {
        switch (value.slot) {
            case WeaponSlot.Main:
                break;
            case WeaponSlot.Off:
                break;
            case WeaponSlot.Both:
                break;
            default:
                weapons.forEach((armor) => {
                    if (armor.name === value.name) {
                        armor.slot = value.slot
                    }
                })
                break;
        }
        updateWeapons(weapons);
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle title={'Equip Armor'}/>
            <DialogContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {weapons.map((weapon: ActorWeapon) => (
                                <TableRow key={weapon.name}>
                                    <TypographyLeftTableCell value={weapon.name}/>
                                    <WeaponSlotTableCell weapon={weapon} onChange={onChange}/>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    );
}