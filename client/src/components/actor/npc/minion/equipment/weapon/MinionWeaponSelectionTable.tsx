import {useEffect, useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Button} from "@mui/material";
import {Weapon} from "../../../../../../models/equipment/Weapon";
import WeaponBackdrop from "../../../../common/equipment/WeaponBackdrop";
import EquipmentService from "../../../../../../services/EquipmentService";
import {renderSingleRowTableHeader} from "../../../../../common/table/TableRenders";
import {EquipmentSlot} from "../../../../../../models/equipment/Equipment";
import ActorService from "../../../../../../services/ActorService";
import Minion from "../../../../../../models/actor/npc/Minion";

interface RowProps {
    weapon: Weapon
    minion: Minion
}

function WeaponNameRow(props: RowProps): JSX.Element {
    const {weapon, minion} = props;
    const [openWeaponBackDrop, setOpenWeaponBackDrop] = useState(false)

    const addWeapon = async () => {
        minion.weapons.push({slot: EquipmentSlot.None, ...weapon, equipped: false})
        await ActorService.updateMinion(minion.name, minion)
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
    minion: Minion
}

export default function MinionWeaponSelectionTable(props: TableProps) {
    const {minion} = props
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
                        <WeaponNameRow weapon={weapon} minion={minion}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}