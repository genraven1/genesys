import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import * as React from "react";
import {useNavigate, useParams} from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import {Weapon} from "../../../models/equipment/Weapon";
import {EquipmentPath} from "../../../services/Path";
import {ViewFieldCard} from "../../common/ViewFieldCard";
import {ViewNumberCheckBoxCard} from "../../common/NumberCheckBox";

export default function WeaponView(props: {weapon: Weapon}) {
    const {weapon} = props
    const {name} = useParams<{ name: string }>()
    const path = EquipmentPath.Weapon
    let navigate = useNavigate()

    const onEdit = () => {
        navigate(path + name + '/edit')
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={name}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small' />
                </IconButton>}>
            </CardHeader>
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <ViewFieldCard name={'Description'} value={weapon?.description!!} />
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <ViewFieldCard name={'Required Skill'} value={String(weapon?.skill?.name!!)} />
                        <ViewFieldCard name={'Damage'} value={String(weapon?.damage!!)} />
                        <ViewFieldCard name={'Critical'} value={String(weapon?.critical!!)} />
                        <ViewFieldCard name={'Range'} value={String(weapon?.range!!)} />
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <ViewFieldCard name={'Encumbrance'} value={String(weapon?.encumbrance!!)} />
                        <ViewNumberCheckBoxCard  title={'Price'} check={weapon?.restricted!!} value={weapon?.price!!} checkTitle={'Restricted'}/>
                        <ViewFieldCard name={'Rarity'} value={String(weapon?.rarity!!)} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
