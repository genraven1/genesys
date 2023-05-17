import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import * as React from "react";
import {useNavigate, useParams} from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import {Weapon} from "../../../models/equipment/Weapon";
import {EquipmentPath} from "../../../services/Path";
import {ViewFieldCard} from "../../common/ViewFieldCard";
import {ViewNumberCheckBoxCard} from "../../common/NumberCheckBox";
import Setting from "../../../models/Setting";
import Typography from "@mui/material/Typography";
import ViewSettingsCard from "../../common/ViewSettingsCard";

interface Props {
    weapon: Weapon
    allSettings: Setting[]
}

export default function WeaponView(props: Props) {
    const {weapon, allSettings} = props
    const {name} = useParams<{ name: string }>()
    let navigate = useNavigate()

    const onEdit = () => {
        navigate(EquipmentPath.Weapon + name + '/edit')
    }

    const renderDamage = (): JSX.Element => {
        let damage = ''
        if (weapon?.brawn!!) {
            damage = 'Brawn + ' + weapon?.damage!!
        }
        else {
            damage = String(weapon?.damage!!)
        }
        return (
            <Typography>{damage}</Typography>
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
                        {renderDamage()}
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
                        <ViewSettingsCard settingIds={weapon?.settings!!} allSettings={allSettings} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
