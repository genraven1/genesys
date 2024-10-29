import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import {Fragment, useState} from "react";
import {TypographyCenterTableCell, TypographyLeftTableCell} from "../../../../../common/table/TypographyTableCell";
import {renderQualities, renderSoak} from "../../../../../../models/equipment/EquipmentHelper";
import {ActorArmor, Armor, ArmorSlot} from "../../../../../../models/equipment/Armor";
import {renderSingleRowTableHeader} from "../../../../../common/table/TableRenders";
import {Button, TableFooter} from "@mui/material";
import Rival from "../../../../../../models/actor/npc/Rival";
import {useLocation} from "react-router-dom";
import ActorService from "../../../../../../services/ActorService";
import ArmorSelectionDialog from "../../../../common/equipment/ArmorSelectionDialog";
import ArmorEquipDialog from "../../../rival/equipment/armor/ArmorEquipDialog";
import BooleanTableCell from "../../../../../common/table/BooleanTableCell";

interface Props {
    rival: Rival
}

export default function RivalArmorTable(props: Props) {
    const {rival} = props;
    const headers = ['Name', 'Equipped', 'Defense', 'Soak', 'Special Qualities'];
    const [armor, setArmor] = useState<ActorArmor[]>(rival.armors);
    const [openCreateArmorDialog, setOpenCreateArmorDialog] = useState(false);
    const [openSelectArmorDialog, setOpenSelectArmorDialog] = useState(false);
    const [openEquipArmorDialog, setOpenEquipArmorDialog] = useState(false);
    const pathname = useLocation().pathname;

    const renderTableBody = () => {
        if (!armor) {
            return <Fragment/>
        } else {
            return (
                <TableBody>
                    {armor.map((armor: ActorArmor) => (
                        <TableRow key={armor.id}>
                            <TypographyLeftTableCell value={armor.name}/>
                            <BooleanTableCell bool={armor.slot === ArmorSlot.Body}/>
                            <TypographyCenterTableCell value={String(armor.defense)}/>
                            <TypographyCenterTableCell value={renderSoak(armor)}/>
                            <TypographyCenterTableCell value={renderQualities(armor)}/>
                        </TableRow>
                    ))}
                </TableBody>
            )
        }
    }

    const createArmor = async () => {
        let updatedRival = await ActorService.updateRival({
            ...rival,
            armors: [...rival.armors, {
                slot: ArmorSlot.None,
                id: 'custom',
                modifiers: [],
                soak: 0,
                defense: 0,
                name: 'Default',
                price: 0,
                rarity: 0,
                restricted: false,
                encumbrance: 0,
                description: '',
                qualities: []
            }]
        })
        setArmor(updatedRival.armors);
    };

    const addArmor = async (armor: Armor) => {
        let updatedRival = await ActorService.updateRival({
            ...rival,
            armors: [...rival.armors, {
                slot: ArmorSlot.None,
                ...armor
            }]
        });
        setArmor(updatedRival.armors);
    };

    const equipArmor = async (armors: ActorArmor[]) => {
        let updatedRival = await ActorService.updateRival({
            ...rival,
            armors: armors
        });
        setArmor(updatedRival.armors);
    }

    const renderTableFooter = () => {
        if (pathname.endsWith(rival.id + '/edit')) {
            return (
                <TableFooter>
                    <TableRow key={'Footer'}>
                        <Button color='primary' variant='contained' onClick={(): void => setOpenCreateArmorDialog(true)}>Create
                            Armor</Button>
                        {openCreateArmorDialog && <ArmorSelectionDialog open={openCreateArmorDialog}
                                                                        onClose={(): void => setOpenCreateArmorDialog(false)}
                                                                        addArmor={addArmor}/>}
                        <Button color='primary' variant='contained'
                                onClick={(): void => setOpenSelectArmorDialog(true)}>Add
                            Armor</Button>
                        {openSelectArmorDialog && <ArmorSelectionDialog open={openSelectArmorDialog}
                                                                        onClose={(): void => setOpenSelectArmorDialog(false)}
                                                                        addArmor={addArmor}/>}
                        <Button color='primary' variant='contained' onClick={(): void => setOpenEquipArmorDialog(true)}>Equip
                            Armor</Button>
                        {openEquipArmorDialog && <ArmorEquipDialog open={openEquipArmorDialog}
                                                                   onClose={(): void => setOpenEquipArmorDialog(false)}
                                                                   updateArmors={equipArmor} armors={rival.armors}/>}
                    </TableRow>
                </TableFooter>
            )
        } else {
            return <Fragment/>
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderSingleRowTableHeader(headers)}
                {renderTableBody()}
                {renderTableFooter()}
            </Table>
        </TableContainer>
    )
}