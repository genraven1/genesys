import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import {Armor, DefaultArmor} from "../../../models/equipment/Equipment";
import EquipmentService from "../../../services/EquipmentService";
import {Path} from "../../../services/Path";
import {ViewFieldCard} from "../../common/ViewFieldCard";
import {ViewNumberCheckBoxCard} from "../../common/NumberCheckBox";

export default function ViewArmor() {
    const { name } = useParams<{ name: string }>();
    const [armor, setArmor] = useState<Armor | null>(null);
    let navigate = useNavigate()

    useEffect(() => {
        if (!name) {
            return;
        }
        (async (): Promise<void> => {
            const armorData = await EquipmentService.getArmor(name);
            if (!armorData) {return}
            setArmor(armorData);
        })();
    }, [name])

    function getName(armor: Armor | null): string {
        if (!armor) {
            return 'Armor View'
        }
        return armor.name
    }

    function getArmor(armor: Armor | null): Armor {
        if (!armor) {
            return DefaultArmor.create();
        }
        return armor
    }

    const onEdit = () => {
        navigate(Path.Armor + name + '/edit');
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={getName(armor)}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small' />
                </IconButton>}>
            </CardHeader>
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <ViewFieldCard name={'Description'} value={getArmor(armor).description} />
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <ViewFieldCard name={'Soak'} value={String(getArmor(armor).soak)} />
                        <ViewFieldCard name={'Defense'} value={String(getArmor(armor).defense)} />
                        <ViewFieldCard name={'Encumbrance'} value={String(getArmor(armor).encumbrance)} />
                        <ViewNumberCheckBoxCard  title={'Price'} check={getArmor(armor).restricted} value={getArmor(armor).price} checkTitle={'Restricted'}/>
                        <ViewFieldCard name={'Rarity'} value={String(getArmor(armor).rarity)} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
