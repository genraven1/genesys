import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import {ViewNumberCheckBoxCard} from "../../common/NumberCheckBox";
import {Armor} from "../../../models/equipment/Equipment";
import {ViewFieldCard} from "../../common/ViewFieldCard";
import {Path} from "../../../services/Path";


export default function ArmorView(props: {armor: Armor}) {
    const {armor} = props
    const { name } = useParams<{ name: string }>()
    let navigate = useNavigate()

    const onEdit = () => {
        navigate(Path.Armor + name + '/edit');
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
                        <ViewFieldCard name={'Description'} value={armor?.description!!} />
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <ViewFieldCard name={'Soak'} value={String(armor?.soak!!)} />
                        <ViewFieldCard name={'Defense'} value={String(armor?.defense!!)} />
                        <ViewFieldCard name={'Encumbrance'} value={String(armor?.encumbrance!!)} />
                        <ViewNumberCheckBoxCard  title={'Price'} check={armor?.restricted!!} value={armor?.price!!} checkTitle={'Restricted'}/>
                        <ViewFieldCard name={'Rarity'} value={String(armor?.rarity!!)} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
