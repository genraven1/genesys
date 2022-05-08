import { Grid, Card, CardHeader, Divider, CardActions, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import { ArmorStats, DefaultArmorStats } from "../../models/equipment/Armor";
import InputButtonGroup from "../input/InputButtonGroup";

interface Props {
    newArmorStats?: ArmorStats | null,
    onArmorStatsUpdate: (armorStats: ArmorStats) => ArmorStats,
}

export default function CreateArmorStats(props: Props): JSX.Element {
    const { newArmorStats, onArmorStatsUpdate } = props;
    const [armorStats, setArmorStats] = useState<ArmorStats>(newArmorStats ?? DefaultArmorStats.create());

    const handleSoakDecrease = () => {
        setArmorStats((prev_state) => ({
            ...prev_state,
            defense: armorStats.soak--,
        }));
        setArmorStats(onArmorStatsUpdate(armorStats));
    }

    const handleSoakIncrease = () => {
        setArmorStats((prev_state) => ({
            ...prev_state,
            defense: armorStats.soak++,
        }));
        setArmorStats(onArmorStatsUpdate(armorStats));
    }

    const handleDefenseDecrease = () => {
        setArmorStats((prev_state) => ({
            ...prev_state,
            defense: armorStats.defense--,
        }));
        setArmorStats(onArmorStatsUpdate(armorStats));
    }

    const handleDefenseIncrease = () => {
        setArmorStats((prev_state) => ({
            ...prev_state,
            defense: armorStats.defense++,
        }));
        setArmorStats(onArmorStatsUpdate(armorStats));
    }

    return (
        <Fragment>
            <Grid item xs>
                <Card>
                    <CardHeader title={'Soak'} style={{ textAlign: 'center' }} />
                    <Divider />
                    <Typography style={{ textAlign: 'center' }} >{armorStats.soak}</Typography>
                    <CardActions>
                        <InputButtonGroup onIncrease={handleSoakIncrease} onDecrease={handleSoakDecrease} />
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs>
                <Card>
                    <CardHeader title={'Defense'} style={{ textAlign: 'center' }} />
                    <Divider />
                    <Typography style={{ textAlign: 'center' }} >{armorStats.defense}</Typography>
                    <CardActions>
                        <InputButtonGroup onIncrease={handleDefenseIncrease} onDecrease={handleDefenseDecrease} />
                    </CardActions>
                </Card>
            </Grid>
        </Fragment>
    )
}