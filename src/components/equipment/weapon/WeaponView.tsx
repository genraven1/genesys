import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import * as React from "react";
import {useNavigate, useParams} from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import {Weapon} from "../../../models/equipment/Weapon";
import {EquipmentPath} from "../../../services/Path";
import {ViewFieldCard} from "../../common/ViewFieldCard";
import {ViewNumberCheckBoxCard} from "../../common/NumberCheckBox";
import Setting from "../../../models/Setting";
import {Fragment} from "react";
import GenesysDescriptionTypography from "../../common/typography/GenesysDescriptionTypography";

interface Props {
    weapon: Weapon
    allSettings: Setting[]
}

export default function WeaponView(props: Props) {
    const {weapon, allSettings} = props
    const {id} = useParams<{ id: string }>()
    const path = EquipmentPath.Weapon
    let navigate = useNavigate()

    const onEdit = () => {
        navigate(path + id + '/edit')
    }

    const renderSettings = ():JSX.Element => {
        if (weapon?.settings!! === undefined) {
            return <Fragment/>
        }
        let settingList = []
        for (let setting of allSettings) {
            if (weapon?.settings.includes(setting.id)) {
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
                title={weapon?.name!!}
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
                </Grid>
            </CardContent>
        </Card>
    )
}
