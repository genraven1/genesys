import {Card, CardContent, CardHeader, Divider, Grid} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import Roll from "../../models/Roll";
import GenesysDescriptionTypography from "../common/GenesysDescriptionTypography";
import InputNumberRangeSelectField from "../common/InputNumberRangeSelect";

export default function ViewRoll(): JSX.Element {
    const [roll, setRoll] = useState<Roll>()

    const onChange = () => {

    }

    return (
        <Card>
            <CardHeader style={{textAlign: 'center'}} title={'Roll'}/>
            <Divider />
            <CardContent>
                <Grid container spacing={2} justifyContent={'center'} direction="row">
                    <Grid container item xs={6}>
                        <GenesysDescriptionTypography text={'[boost]'}/>
                    </Grid>
                    <Grid container item xs={6}>
                        <InputNumberRangeSelectField defaultValue={roll?.boost!!} min={0} max={4} onCommit={onChange}/>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}