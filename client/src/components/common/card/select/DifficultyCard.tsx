import {Difficulty} from "../../../../models/common/Difficulty";
import {Card, CardContent, Grid, MenuItem, Select} from "@mui/material";
import * as React from "react";
import CenteredCardHeader from "../header/CenteredCardHeader";
import GenesysDifficultyDiceTypography from "../../typography/GenesysDifficultyDiceTypography";

interface Props {
    value: Difficulty
    onChange: (value: Difficulty) => void
    disabled: boolean
}

export default function DifficultyCard(props: Props) {
    const {value, onChange, disabled} = props;

    const renderViewCard = () => {
        return (
            <Grid item xs>
                <Card>
                    <CenteredCardHeader title={'Difficulty'}/>
                    <CardContent>
                        <GenesysDifficultyDiceTypography difficulty={value}/>
                    </CardContent>
                </Card>
            </Grid>
        )
    }

    const renderCard = () => {
        return (
            <Grid item xs>
                <Card>
                    <CenteredCardHeader title={'Difficulty'}/>
                    <CardContent>
                        <Select
                            value={value}
                            onChange={(e) => onChange(e.target.value as Difficulty)}
                            disabled={disabled}
                            fullWidth
                            label={'Difficulty'}
                        >
                            {Object.values(Difficulty).map(difficulty => (
                                <MenuItem key={difficulty} value={difficulty}>
                                    <GenesysDifficultyDiceTypography difficulty={difficulty}/>
                                </MenuItem>
                            ))}
                        </Select>
                    </CardContent>
                </Card>
            </Grid>
        )
    };

    return disabled ? renderViewCard() : renderCard();
}