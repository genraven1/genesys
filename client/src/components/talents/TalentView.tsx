import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import {ViewFieldCard} from "../common/ViewFieldCard";
import Talent from "../../models/Talent";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import {RootPath} from "../../services/Path";
import EditIcon from "@mui/icons-material/Edit";
import {Fragment} from "react";
import TalentModifierCard from "./modifier/TalentModifierCard";

interface Props {
    talent: Talent
}

export default function TalentView(props: Props) {
    const {talent} = props
    let navigate = useNavigate()

    const onEdit = () => {
        navigate(RootPath.Talent + talent.name + '/edit')
    }

    const renderRanked = (): JSX.Element => {
        return talent.ranked === undefined ? <Fragment/> :
            <ViewFieldCard name={'Ranked'} value={talent.ranked ? 'Yes' : 'No'}/>;
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={talent.name}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small'/>
                </IconButton>}>
            </CardHeader>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={2}>
                        <ViewFieldCard name={'Description'} value={talent.description}/>
                    </Grid>
                    <Divider/>
                    <Grid container spacing={2}>
                        {renderRanked()}
                        <ViewFieldCard name={'Activation'} value={talent.activation}/>
                        <ViewFieldCard name={'Tier'} value={talent.tier}/>
                    </Grid>
                </Grid>
                <TalentModifierCard talent={talent}/>
            </CardContent>
        </Card>
    )
}
