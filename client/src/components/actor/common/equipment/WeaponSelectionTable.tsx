import {useEffect, useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Button} from "@mui/material";
import WeaponBackdrop from "./WeaponBackdrop";
import ActorService from "../../../../services/ActorService";
import Actor, {ActorType} from "../../../../models/actor/Actor";
import EquipmentService from "../../../../services/EquipmentService";
import {ActorWeapon, Weapon} from "../../../../models/equipment/Weapon";
import {renderHeaders} from "../../../common/table/TableRenders";

interface RowProps {
    weapon: Weapon
    actor: Actor
}

function WeaponNameRow(props: RowProps): JSX.Element {
    const {weapon, actor} = props;
    const [openWeaponBackDrop, setOpenWeaponBackDrop] = useState(false)

    const addWeapon = async () => {
        switch (actor.type) {
            case ActorType.Nemesis:
                await ActorService.createNemesisWeapon(actor.name, {...weapon} as ActorWeapon)
                break
            case ActorType.Rival:
                await ActorService.createRivalWeapon(actor.name, {...weapon} as ActorWeapon)
                break
            case ActorType.Minion:
                await ActorService.createMinionWeapon(actor.name, {...weapon} as ActorWeapon)
                break
            case ActorType.Player:
                await ActorService.createPlayerWeapon(actor.name, {...weapon} as ActorWeapon)
                break
        }
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
    actor: Actor
}

export default function WeaponSelectionTable(props: TableProps) {
    const {actor} = props
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
                <TableHead>
                    {renderHeaders(headers)}
                </TableHead>
                <TableBody>
                    {weapons.map((weapon: Weapon) => (
                        <WeaponNameRow weapon={weapon} actor={actor}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}