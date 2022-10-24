import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import * as React from "react";
import {useNavigate, useParams} from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import {Gear} from "../../../models/equipment/Equipment";
import {EquipmentPath} from "../../../services/Path";
import {ViewFieldCard} from "../../common/ViewFieldCard";
import {ViewNumberCheckBoxCard} from "../../common/NumberCheckBox";

export default function GearView(props: {gear: Gear}) {
    const {gear} = props
    const {name} = useParams<{ name: string }>()
    const path = EquipmentPath.Gear
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
                        <ViewFieldCard name={'Description'} value={gear?.description!!} />
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <ViewFieldCard name={'Required Skill'} value={String(gear?.skill?.name!!)} />
                        <ViewFieldCard name={'Range'} value={String(gear?.range!!)} />
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <ViewFieldCard name={'Encumbrance'} value={String(gear?.encumbrance!!)} />
                        <ViewNumberCheckBoxCard  title={'Price'} check={gear?.restricted!!} value={gear?.price!!} checkTitle={'Restricted'}/>
                        <ViewFieldCard name={'Rarity'} value={String(gear?.rarity!!)} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}