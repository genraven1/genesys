import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import {ViewNumberCheckBoxCard} from "../../common/NumberCheckBox";
import {Armor} from "../../../models/equipment/Armor";
import {ViewFieldCard} from "../../common/ViewFieldCard";
import {EquipmentPath} from "../../../services/Path";
import Setting from "../../../models/Setting";
import {Fragment} from "react";
import GenesysDescriptionTypography from "../../common/typography/GenesysDescriptionTypography";

interface Props {
    armor: Armor
    allSettings: Setting[]
}

export default function ArmorView(props: Props) {
    const {armor, allSettings} = props
    const {id} = useParams<{ id: string }>()
    let navigate = useNavigate()

    const onEdit = () => {
        navigate(EquipmentPath.Armor + id + '/edit');
    }

    const renderSettings = ():JSX.Element => {
        if (armor?.settings!! === undefined) {
            return <Fragment/>
        }
        let settingList = []
        for (let setting of allSettings) {
            if (armor?.settings.includes(setting.id)) {
                settingList.push(setting)
            }
        }
        return (
            <Fragment>
                {(settingList || []).map((setting: Setting):JSX.Element => {
                    return <GenesysDescriptionTypography text={setting?.name!!}/>
                })}
            </Fragment>
        )
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={armor?.name!!}
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
                <Divider />
                <Grid container spacing={10}>
                    <Grid item xs>
                        <Card>
                            <CardHeader title={'Settings'} style={{ textAlign: 'center' }} />
                            <Divider />
                            <CardContent>
                                {renderSettings()}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
