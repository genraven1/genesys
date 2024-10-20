import {Autocomplete, Card, CardContent, Grid, IconButton, TextField} from "@mui/material";
import CenteredCardHeader from "../../common/card/CenteredCardHeader";
import {useEffect, useState} from "react";
import Archetype from "../../../models/actor/player/Archetype";
import ArchetypeService from "../../../services/ArchetypeService";
import InfoIcon from "@mui/icons-material/Info";
import * as React from "react";
import ArchetypeBackdrop from "../../archetype/ArchetypeBackdrop";

interface AllProps {
    defaultValue: Archetype
    onCommit: (value: Archetype) => void
}

export default function ArchetypeSelectCard(props: AllProps) {
    const {defaultValue, onCommit} = props;
    const [archetypes, setArchetypes] = useState<Archetype[]>([]);
    const [openPlayerBackDrop, setOpenPlayerBackDrop] = useState(false);

    useEffect(() => {
        (async (): Promise<void> => {
            setArchetypes(await ArchetypeService.getArchetypes())
        })()
    }, [])

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={'Archetype'}/>
                <CardContent>
                    <Grid container>
                        <Grid item sx={{"width": .9}}>
                            <Autocomplete
                                options={archetypes}
                                getOptionLabel={(option) => option.name}
                                value={defaultValue}
                                fullWidth
                                onChange={(e, newValue) => onCommit(newValue as Archetype)}
                                renderInput={(params) => <TextField {...params} label='Archetype'
                                                                    variant="outlined"/>}
                                // disabled={disabled}
                            />
                        </Grid>
                        <Grid item>
                            <IconButton onClick={(): void => setOpenPlayerBackDrop(true)}>
                                <InfoIcon/>
                            </IconButton>
                            {openPlayerBackDrop &&
                                <ArchetypeBackdrop open={openPlayerBackDrop}
                                                   onClose={(): void => setOpenPlayerBackDrop(false)}
                                                   archetype={defaultValue}/>}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
}