import {Card, CardContent, Grid, MenuItem, Select} from "@mui/material";
import CenteredCardHeader from "../../common/card/header/CenteredCardHeader";
import * as React from "react";
import {OrgType} from "../../../models/lore/Organization";

interface Props {
    value: OrgType
    onChange: (value: OrgType) => void
    disabled: boolean
}

export default function OrganizationTypeCard(props: Props) {
    const {value, onChange, disabled} = props;

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={'Organization Type'}/>
                <CardContent>
                    <Select
                        value={value}
                        onChange={(e) => onChange(e.target.value as OrgType)}
                        disabled={disabled}
                        fullWidth
                        label={'Organization Type'}
                        variant={"standard"}
                    >
                        {Object.values(OrgType).map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </CardContent>
            </Card>
        </Grid>
    );
}