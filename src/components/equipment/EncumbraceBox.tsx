import { Grid, Card, CardHeader, Divider, CardActions, Typography, Box } from "@mui/material";
import { Fragment, useState } from "react";
import Equipment, { DefaultEquipment } from "../../models/equipment/Equipment";
import InputButtonGroup from "../input/InputButtonGroup";

interface Props {
    newEquipment: Equipment,
    onEquipmentUpdate: (equipment: Equipment) => Equipment;
}

export default function CreateEquipmentBox(props: Props): JSX.Element {
    const { newEquipment, onEquipmentUpdate } = props;
    const [equipment, setEquipment] = useState<Equipment>(newEquipment ?? DefaultEquipment.create());

    const handleEncumbranceDecrease = () => {
        setEquipment((prev_state) => ({
            ...prev_state,
            encumbrance: equipment.encumbrance--,
        }));
        setEquipment(onEquipmentUpdate(equipment));
    }

    const handleEncumbranceIncrease = () => {
        setEquipment((prev_state) => ({
            ...prev_state,
            encumbrance: equipment.encumbrance++,
        }));
        setEquipment(onEquipmentUpdate(equipment));
        console.log(equipment)
    }

    return (
        <Fragment>
            <Grid item xs>
                <Card>
                    <CardHeader title={'Encumbrance'} style={{ textAlign: 'center' }} />
                    <Divider />
                    <Typography style={{ textAlign: 'center' }} >{newEquipment.encumbrance}</Typography>
                    <CardActions>
                        <InputButtonGroup onIncrease={handleEncumbranceIncrease} onDecrease={handleEncumbranceDecrease} />
                    </CardActions>
                </Card>
            </Grid>
            {/* <Grid item xs>
                <Card>
                    <CardHeader title={'Price'} style={{ textAlign: 'center' }} />
                    <Divider />
                    <Typography style={{ textAlign: 'center' }} >{newEquipment.price}</Typography>
                    <CardActions>
                        <InputButtonGroup onIncrease={handleEncumbranceIncrease} onDecrease={handleEncumbranceDecrease} />
                    </CardActions>
                </Card>
            </Grid> */}
        </Fragment>
    )
}