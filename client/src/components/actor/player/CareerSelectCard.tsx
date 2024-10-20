import {ChangeEvent, useEffect, useState} from "react";
import {
    Autocomplete,
    Card,
    CardContent,
    ClickAwayListener,
    Grid,
    IconButton,
    MenuItem,
    TextField,
    Typography
} from "@mui/material";
import EditField from "../../common/EditField";
import CenteredCardHeader from "../../common/card/CenteredCardHeader";
import CareerService from "../../../services/CareerService";
import Career from "../../../models/actor/player/Career";
import Archetype from "../../../models/actor/player/Archetype";
import InfoIcon from "@mui/icons-material/Info";
import ArchetypeBackdrop from "../../archetype/ArchetypeBackdrop";
import * as React from "react";
import CareerBackdrop from "../../career/CareerBackdrop";

interface Props {
    defaultValue: Career
    onCommit: (value: Career) => void
}

export default function CareerSelectCard(props: Props) {
    const {defaultValue, onCommit} = props;
    const [careers, setCareers] = useState<Career[]>([]);
    const [openCareerBackDrop, setOpenCareerBackDrop] = useState(false);

    useEffect(() => {
        (async (): Promise<void> => {
            setCareers(await CareerService.getCareers());
        })()
    }, [])

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={'Career'}/>
                <CardContent>
                    <Grid container>
                        <Grid item sx={{"width": .9}}>
                            <Autocomplete
                                options={careers}
                                getOptionLabel={(option) => option.name}
                                value={defaultValue}
                                fullWidth
                                onChange={(e, newValue) => onCommit(newValue as Career)}
                                renderInput={(params) => <TextField {...params} label='Career'
                                                                    variant="outlined"/>}
                            />
                        </Grid>
                        <Grid item>
                            <IconButton onClick={(): void => setOpenCareerBackDrop(true)}>
                                <InfoIcon/>
                            </IconButton>
                            {openCareerBackDrop &&
                                <CareerBackdrop open={openCareerBackDrop}
                                                   onClose={(): void => setOpenCareerBackDrop(false)}
                                                   career={defaultValue}/>}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
}