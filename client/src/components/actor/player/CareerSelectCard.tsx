import {useEffect, useState} from "react";
import {Autocomplete, Card, CardContent, Grid, IconButton, TextField,} from "@mui/material";
import CenteredCardHeader from "../../common/card/CenteredCardHeader";
import CareerService from "../../../services/CareerService";
import Career from "../../../models/actor/player/Career";
import InfoIcon from "@mui/icons-material/Info";
import * as React from "react";
import CareerBackdrop from "../../career/CareerBackdrop";
import EditIcon from "@mui/icons-material/Edit";
import Player from "../../../models/actor/player/Player";
import CareerSkillSelectDialog from "./skill/CareerSkillSelectDialog";
import Skill from "../../../models/actor/Skill";

interface Props {
    player: Player
    onCommit: (value: Career) => void
    onSkillSelect: (skills: Skill[]) => void
}

export default function CareerSelectCard(props: Props) {
    const {player, onCommit, onSkillSelect} = props;
    const [careers, setCareers] = useState<Career[]>([]);
    const [openCareerBackDrop, setOpenCareerBackDrop] = useState(false);
    const [openCareerSkillDialog, setOpenCareerSkillDialog] = useState(false);

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
                        <Grid item sx={{"width": .8}}>
                            <Autocomplete
                                options={careers}
                                getOptionLabel={(option) => option.name}
                                value={player.career}
                                fullWidth
                                onChange={(e, newValue) => onCommit(newValue as Career)}
                                renderInput={(params) => <TextField {...params} label='Career'
                                                                    variant="outlined"/>}
                            />
                        </Grid>
                        <Grid item sx={{"width": .1}}>
                            <IconButton onClick={(): void => setOpenCareerSkillDialog(true)}>
                                <EditIcon/>
                            </IconButton>
                            {openCareerSkillDialog &&
                                <CareerSkillSelectDialog open={openCareerSkillDialog}
                                                         onClose={(): void => setOpenCareerSkillDialog(false)}
                                                         player={player} onSelect={onSkillSelect}/>}
                        </Grid>
                        <Grid item sx={{"width": .1}}>
                            <IconButton onClick={(): void => setOpenCareerBackDrop(true)}>
                                <InfoIcon/>
                            </IconButton>
                            {openCareerBackDrop &&
                                <CareerBackdrop open={openCareerBackDrop}
                                                onClose={(): void => setOpenCareerBackDrop(false)}
                                                career={player.career}/>}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
}