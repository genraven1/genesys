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

interface RowProps {
    name: string
    actor: Actor
}

function WeaponNameRow(props: RowProps): JSX.Element {
    const {name, actor} = props;
    const [weapon, setWeapon] = useState<Weapon>()
    const [openWeaponBackDrop, setOpenWeaponBackDrop] = useState(false)

    useEffect(() => {
        if (!name) {return}
        (async (): Promise<void> => {
            const weaponData = await EquipmentService.getWeapon(name)
            if (!weaponData) { return }
            setWeapon(weaponData)
        })()
    }, [name])

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
    const [names, setNames] = useState<string[]>([])

    useEffect(() => {
        (async (): Promise<void> => {
            const weaponList = await EquipmentService.getWeaponsNames()
            if (!weaponList) { return }
            setNames(weaponList)
        })()
    }, [setNames])

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell>Weapon Name</TableCell>
                        <TableCell>Add</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {names.map((name: string) => (
                        <WeaponNameRow name={name} actor={actor}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}