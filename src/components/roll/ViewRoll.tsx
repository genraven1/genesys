import {Card, CardContent, CardHeader, Divider, Grid, Icon, IconButton} from "@mui/material";
import * as React from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {useState} from "react";
import Roll from "../../models/roll/dice/Roll";

export default function ViewRoll(): JSX.Element {
    const [roll, setRoll] = useState<Roll>()

    const handleClick = () => {

    }

    const addDieType = (
        <IconButton title='Add' size='small' onClick={(): void => handleClick()}>
            <AddIcon color='primary' fontSize='small' />
        </IconButton>
    )

    const removeDieType = (
        <IconButton title='Remove' size='small' onClick={(): void => handleClick()}>
            <RemoveIcon color='primary' fontSize='small' />
        </IconButton>
    )

    return (
        <Card>
            <CardHeader style={{textAlign: 'center'}} title={'Roll'}/>
            <Divider />
            <CardContent>
                <Grid container spacing={2} justifyContent={'center'}>
                    <Grid container item xs={6} direction="column" >
                        {addDieType}<Icon/>{removeDieType}
                    </Grid>
                    <Grid container item xs={6} direction="column" >

                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}