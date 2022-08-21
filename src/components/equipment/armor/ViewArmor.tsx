import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import {Armor, DefaultArmor} from "../../../models/equipment/Equipment";
import EquipmentService from "../../../services/EquipmentService";
import {Path} from "../../../services/Path";
import ViewFieldCard from "../../common/ViewFieldCard";

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
                        <ViewFieldCard name={'Description'} text={getArmor(armor).description} />
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <ViewFieldCard name={'Soak'} text={String(getArmor(armor).soak)} />
                        <ViewFieldCard name={'Defense'} text={String(getArmor(armor).defense)} />
                        <ViewFieldCard name={'Encumbrance'} text={String(getArmor(armor).encumbrance)} />
                        <ViewFieldCard name={'Price'} text={String(getArmor(armor).price)} />
                        <ViewFieldCard name={'Rarity'} text={String(getArmor(armor).rarity)} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
