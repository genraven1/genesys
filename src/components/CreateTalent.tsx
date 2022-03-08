import { Card, CardActions, CardContent, CardHeader, TextField } from "@mui/material";
import { useState } from "react";


export default function CreateTalent() {
    const [talentName, setTalentName] = useState('');

    return (
        <Card>
            <CardHeader title='Create a Talent'>
            </CardHeader>
            <CardContent>
                <TextField label='Talent Name' value={talentName}>

                </TextField>
            </CardContent>
            <CardActions>

            </CardActions>
        </Card>
    )
}
