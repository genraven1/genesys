import {useEffect, useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Button} from "@mui/material";
import {Weapon, WeaponSlot} from "../../../../../../models/equipment/Weapon";
import WeaponBackdrop from "../../../../common/equipment/WeaponBackdrop";
import EquipmentService from "../../../../../../services/EquipmentService";
import {renderSingleRowTableHeader} from "../../../../../common/table/TableRenders";
import ActorService from "../../../../../../services/ActorService";
import Rival from "../../../../../../models/actor/npc/Rival";

interface RowProps {
    weapon: Weapon
    rival: Rival
}

function WeaponNameRow(props: RowProps): JSX.Element {
    const {weapon, rival} = props;
    const [openWeaponBackDrop, setOpenWeaponBackDrop] = useState(false)

    const addWeapon = async () => {
        rival.weapons.push({slot: WeaponSlot.None, ...weapon})
        await ActorService.updateRival(rival)
    }

    return (
        <TableRow>
            <TableCell>
                <Button onClick={(): void => setOpenWeaponBackDrop(true)}>{weapon?.name!!}</Button>
                {openWeaponBackDrop && <WeaponBackdrop open={openWeaponBackDrop} onClose={(): void => setOpenWeaponBackDrop(false)} weapon={weapon!!}/>}
            </TableCell>
            <TableCell>
                <Button onClick={addWeapon}>Add</Button>
            </TableCell>
        </TableRow>
    )
}

interface TableProps {
    rival: Rival
}

export default function RivalWeaponSelectionTable(props: TableProps) {
    const {rival} = props
    const [weapons, setWeapons] = useState<Weapon[]>([])
    const headers = ['Name', 'Add']

    useEffect(() => {
        (async (): Promise<void> => {
            const weaponList = await EquipmentService.getWeapons()
            if (!weaponList) { return }
            setWeapons(weaponList)
        })()
    }, [setWeapons])

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderSingleRowTableHeader(headers)}
                <TableBody>
                    {weapons.map((weapon: Weapon) => (
                        <WeaponNameRow weapon={weapon} rival={rival}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}