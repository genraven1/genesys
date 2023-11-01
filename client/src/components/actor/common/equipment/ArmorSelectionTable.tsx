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
import {renderHeaders} from "../../../common/table/TableRenders";

interface RowProps {
    armor: Armor
    actor: Actor
}

function ArmorNameRow(props: RowProps): JSX.Element {
    const {armor, actor} = props;
    const [openArmorBackDrop, setOpenArmorBackDrop] = useState(false)

    const addArmor = async () => {
        switch (actor.type) {
            case ActorType.Nemesis:
                await ActorService.createNemesisArmor(actor.name, {...armor} as ActorArmor)
                break
            case ActorType.Rival:
                await ActorService.createRivalArmor(actor.id, {...armor} as ActorArmor)
                break
            case ActorType.Minion:
                await ActorService.createMinionArmor(actor.id, {...armor} as ActorArmor)
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
    const [armors, setArmors] = useState<Armor[]>([])
    const headers = ['Name', 'Add']

    useEffect(() => {
        (async (): Promise<void> => {
            const armorList = await EquipmentService.getArmors()
            if (!armorList) { return }
            setArmors(armorList)
        })()
    }, [setArmors])

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    {renderHeaders(headers)}
                </TableHead>
                <TableBody>
                    {armors.map((armor: Armor) => (
                        <ArmorNameRow armor={armor} actor={actor}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}