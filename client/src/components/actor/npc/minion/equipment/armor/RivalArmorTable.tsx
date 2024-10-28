import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import {Fragment, useState} from "react";
import {TypographyCenterTableCell, TypographyLeftTableCell} from "../../../../../common/table/TypographyTableCell";
import {renderQualities, renderSoak} from "../../../../../../models/equipment/EquipmentHelper";
import {ActorArmor, ArmorSlot} from "../../../../../../models/equipment/Armor";
import {renderSingleRowTableHeader} from "../../../../../common/table/TableRenders";
import {Button, TableFooter} from "@mui/material";
import Rival from "../../../../../../models/actor/npc/Rival";
import {useLocation} from "react-router-dom";
import ActorService from "../../../../../../services/ActorService";

interface Props {
    rival: Rival
}

export default function RivalArmorTable(props: Props) {
    const {rival} = props;
    const headers = ['Name', 'Defense', 'Soak', 'Special Qualities'];
    const [armor, setArmor] = useState<ActorArmor[]>(rival.armors);
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
                id: '',
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

    const renderTableFooter = () => {
        if (pathname.endsWith(rival.id + '/edit')) {
            return (
                <TableFooter>
                    <TableRow key={'Footer'}>
                        <Button color='primary' variant='contained' onClick={createArmor}>Create
                            Armor</Button>
                        {/*<Button color='primary' variant='contained' onClick={(): void => setOpenSelectArmorDialog(true)}>Add*/}
                        {/*    Armor</Button>*/}
                        {/*{openSelectArmorDialog && <RivalArmorSelectionDialog rival={rival} open={openSelectArmorDialog}*/}
                        {/*                                                     onClose={(): void => setOpenSelectArmorDialog(false)}/>}*/}
                        {/*<Button color='primary' variant='contained' onClick={(): void => setOpenEquipArmorDialog(true)}>Equip*/}
                        {/*    Armor</Button>*/}
                        {/*{openEquipArmorDialog && <RivalArmorEquipDialog rival={rival} open={openEquipArmorDialog}*/}
                        {/*                                                onClose={(): void => setOpenEquipArmorDialog(false)}/>}*/}
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