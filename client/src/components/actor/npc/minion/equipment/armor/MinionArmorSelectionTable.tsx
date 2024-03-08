import {useEffect, useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Button} from "@mui/material";
import {renderSingleRowTableHeader} from "../../../../../common/table/TableRenders";
import {Armor} from "../../../../../../models/equipment/Armor";
import ArmorBackdrop from "../../../../common/equipment/ArmorBackdrop";
import EquipmentService from "../../../../../../services/EquipmentService";
import {EquipmentSlot} from "../../../../../../models/equipment/Equipment";
import ActorService from "../../../../../../services/ActorService";
import Minion from "../../../../../../models/actor/npc/Minion";

interface RowProps {
    armor: Armor
    minion: Minion
}

function ArmorNameRow(props: RowProps): JSX.Element {
    const {armor, minion} = props;
    const [openArmorBackDrop, setOpenArmorBackDrop] = useState(false)

    const addArmor = async () => {
        minion.armor.push({slot: EquipmentSlot.None, ...armor, equipped: false})
        await ActorService.updateMinion(minion.name, minion)
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
    minion: Minion
}

export default function MinionArmorSelectionTable(props: TableProps) {
    const {minion} = props
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
                {renderSingleRowTableHeader(headers)}
                <TableBody>
                    {armors.map((armor: Armor) => (
                        <ArmorNameRow armor={armor} minion={minion}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}