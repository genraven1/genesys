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
import {renderHeaders} from "../../common/table/TableRenders";

interface RowProps {
    quality: Quality
    weapon: Weapon
}

function QualityRow(props: RowProps): JSX.Element {
    const {quality, weapon} = props;
    const [openQualityBackDrop, setOpenQualityBackDrop] = useState(false)

    const addQuality = async () => {
        await EquipmentService.addWeaponQuality(weapon.id, {...quality})
    }

    return (
        <TableRow>
            <TableCell>
                <Button onClick={(): void => setOpenQualityBackDrop(true)}>{quality.name}</Button>
                {openQualityBackDrop &&
                    <QualityBackdrop open={openQualityBackDrop} onClose={(): void => setOpenQualityBackDrop(false)}
                                     quality={quality}/>}
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
    const [qualities, setQualities] = useState<Quality[]>([])
    const headers = ['Name', 'Add']

    useEffect(() => {
        (async (): Promise<void> => {
            const qualityList = await QualityService.getQualities()
            if (!qualityList) {
                return
            }
            setQualities(qualityList)
        })()
    }, [setQualities])

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {renderHeaders(headers)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {qualities.map((quality: Quality) => (
                        <QualityRow quality={quality!!} weapon={weapon}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}