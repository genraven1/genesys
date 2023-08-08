import {useEffect, useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Button} from "@mui/material";
import QualityService from "../../../services/QualityService";
import Quality from "../../../models/Quality";
import QualityBackdrop from "../QualityBackdrop";
import {Weapon} from "../../../models/equipment/Weapon";
import EquipmentService from "../../../services/EquipmentService";

interface RowProps {
    name: string
    weapon: Weapon
}

function QualityRow(props: RowProps): JSX.Element {
    const {name, weapon} = props;
    const [quality, setQuality] = useState<Quality>()
    const [openQualityBackDrop, setOpenQualityBackDrop] = useState(false)

    useEffect(() => {
        if (!name) {return}
        (async (): Promise<void> => {
            const qualityData = await QualityService.getQuality(name)
            if (!qualityData) { return }
            setQuality(qualityData)
        })()
    }, [name])

    const addQuality = async () => {
        await EquipmentService.addWeaponQuality(weapon.name, {...quality!!})
    }

    return (
        <TableRow>
            <TableCell>
                <Button onClick={(): void => setOpenQualityBackDrop(true)}>{quality?.name!!}</Button>
                {openQualityBackDrop && <QualityBackdrop open={openQualityBackDrop} onClose={(): void => setOpenQualityBackDrop(false)} quality={quality!!}/>}
            </TableCell>
            <TableCell>
                <Button onClick={addQuality}>Add</Button>
            </TableCell>
        </TableRow>
    )
}

interface TableProps {
    weapon: Weapon
}

export default function WeaponQualitySelectionTable(props: TableProps) {
    const {weapon} = props
    const [names, setNames] = useState<string[]>([])

    useEffect(() => {
        (async (): Promise<void> => {
            const qualityList = await QualityService.getWeaponQualityNames()
            if (!qualityList) { return }
            setNames(qualityList)
        })()
    }, [setNames])

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell>Quality Name</TableCell>
                        <TableCell>Add</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {names.map((name: string) => (
                        <QualityRow name={name} weapon={weapon}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}