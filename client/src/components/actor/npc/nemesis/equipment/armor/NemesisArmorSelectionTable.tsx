import {useEffect, useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Button} from "@mui/material";
import Nemesis from "../../../../../../models/actor/npc/Nemesis";
import {renderSingleRowTableHeader} from "../../../../../common/table/TableRenders";
import {Armor} from "../../../../../../models/equipment/Armor";
import ArmorBackdrop from "../../../../common/equipment/ArmorBackdrop";
import EquipmentService from "../../../../../../services/EquipmentService";
import {EquipmentSlot} from "../../../../../../models/equipment/Equipment";
import ActorService from "../../../../../../services/ActorService";

interface RowProps {
    armor: Armor
    nemesis: Nemesis
}

function ArmorNameRow(props: RowProps): JSX.Element {
    const {armor, nemesis} = props;
    const [openArmorBackDrop, setOpenArmorBackDrop] = useState(false)

    const addArmor = async () => {
        nemesis.armor.push({slot: EquipmentSlot.None, ...armor})
        await ActorService.updateNemesis(nemesis.name, nemesis)
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
    nemesis: Nemesis
}

export default function NemesisArmorSelectionTable(props: TableProps) {
    const {nemesis} = props
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
                        <ArmorNameRow armor={armor} nemesis={nemesis}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}