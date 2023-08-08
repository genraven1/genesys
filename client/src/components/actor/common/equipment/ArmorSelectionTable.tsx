import {useEffect, useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Button} from "@mui/material";
import ActorService from "../../../../services/ActorService";
import Actor, {ActorType} from "../../../../models/actor/Actor";
import EquipmentService from "../../../../services/EquipmentService";
import {ActorArmor, Armor} from "../../../../models/equipment/Armor";
import ArmorBackdrop from "./ArmorBackdrop";

interface RowProps {
    name: string
    actor: Actor
}

function ArmorNameRow(props: RowProps): JSX.Element {
    const {name, actor} = props;
    const [armor, setArmor] = useState<Armor>()
    const [openArmorBackDrop, setOpenArmorBackDrop] = useState(false)

    useEffect(() => {
        if (!name) {return}
        (async (): Promise<void> => {
            const armorData = await EquipmentService.getArmor(name)
            if (!armorData) { return }
            setArmor(armorData)
        })()
    }, [name])

    const addArmor = async () => {
        switch (actor.type) {
            case ActorType.Nemesis:
                // await ActorService.createNemesisWeapon(actor.name, {...armor} as ActorWeapon)
                break
            case ActorType.Rival:
                // await ActorService.createRivalWeapon(actor.name, {...armor} as ActorWeapon)
                break
            case ActorType.Minion:
                // await ActorService.createMinionWeapon(actor.name, {...armor} as ActorWeapon)
                break
            case ActorType.Player:
                await ActorService.createPlayerArmor(actor.name, {...armor} as ActorArmor)
                break

        }

    }

    return (
        <TableRow>
            <TableCell>
                <Button onClick={(): void => setOpenArmorBackDrop(true)}>{armor?.name!!}</Button>
                {openArmorBackDrop && <ArmorBackdrop open={openArmorBackDrop} onClose={(): void => setOpenArmorBackDrop(false)} armor={armor!!}/>}
            </TableCell>
            <TableCell>
                <Button onClick={addArmor}>Add</Button>
            </TableCell>
        </TableRow>
    )
}

interface TableProps {
    actor: Actor
}

export default function ArmorSelectionTable(props: TableProps) {
    const {actor} = props
    const [names, setNames] = useState<string[]>([])

    useEffect(() => {
        (async (): Promise<void> => {
            const armorList = await EquipmentService.getArmorNames()
            if (!armorList) { return }
            setNames(armorList)
        })()
    }, [setNames])

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell>Armor Name</TableCell>
                        <TableCell>Add</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {names.map((name: string) => (
                        <ArmorNameRow name={name} actor={actor}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}