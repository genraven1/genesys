import {Card, CardContent, Grid, MenuItem, Select, TextField} from "@mui/material";
import Limit, {LimitType} from "../../../../models/common/Limit";
import {useState} from "react";
import {ViewFieldCard} from "../../ViewFieldCard";
import CenteredCardHeader from "../header/CenteredCardHeader";

interface Props {
    initialLimit: Limit
    onChange: (limit: Limit) => void
    disabled: boolean
}

export default function LimitCard(props: Props) {
    const {initialLimit, onChange, disabled} = props;
    const [limit, setLimit] = useState(initialLimit);

    const handleLimitChange = (updatedLimit: Limit) => {
        setLimit(updatedLimit);
        onChange(limit);
    };

    const renderCard = () => {
        if (disabled) {
            return <ViewFieldCard name={'Limit'}
                                  value={limit.type === LimitType.None ? LimitType.None : limit.limit + ' ' + limit.type}/>
        } else {
            return (
                <Card>
                    <CenteredCardHeader title={'Limit'}/>
                    <CardContent>
                        <Grid container justifyContent={'center'}>
                            <Grid item xs>
                                <TextField
                                    type="number"
                                    value={limit.limit}
                                    fullWidth
                                    variant={"standard"}
                                    onChange={(e) => handleLimitChange({
                                        type: limit.type,
                                        limit: Number(e.target.value)
                                    })}
                                    inputProps={{min: 0, max: 1}}
                                />
                            </Grid>
                            <Grid item xs>
                                <Select
                                    value={limit.type}
                                    onChange={(e) => onChange({
                                        limit: limit.limit,
                                        type: e.target.value as LimitType
                                    })}
                                    fullWidth
                                    label={'Type'}
                                    variant={"standard"}
                                >
                                    {Object.values(LimitType).map(option => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            )
        }
    }

    return (
        <Grid item xs>
            {renderCard()}
        </Grid>
    )
}