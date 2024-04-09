import {useEffect, useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Button} from "@mui/material";
import Nemesis from "../../../../../../models/actor/npc/Nemesis";
import {Weapon} from "../../../../../../models/equipment/Weapon";
import WeaponBackdrop from "../../../../common/equipment/WeaponBackdrop";
import EquipmentService from "../../../../../../services/EquipmentService";
import {renderSingleRowTableHeader} from "../../../../../common/table/TableRenders";
import {EquipmentSlot} from "../../../../../../models/equipment/Equipment";
import ActorService from "../../../../../../services/ActorService";

interface RowProps {
    weapon: Weapon
    nemesis: Nemesis
}

function WeaponNameRow(props: RowProps): JSX.Element {
    const {weapon, nemesis} = props;
    const [openWeaponBackDrop, setOpenWeaponBackDrop] = useState(false)

    const addWeapon = async () => {
        nemesis.weapons.push({slot: EquipmentSlot.None, ...weapon})
        await ActorService.updateNemesis(nemesis.name, nemesis)
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
    nemesis: Nemesis
}

export default function NemesisWeaponSelectionTable(props: TableProps) {
    const {nemesis} = props
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
                        <WeaponNameRow weapon={weapon} nemesis={nemesis}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}