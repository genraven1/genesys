import {
    Card,
    CardContent,
    Checkbox,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select
} from "@mui/material";
import CenteredCardHeader from "../common/card/CenteredCardHeader";
import Career from "../../models/actor/player/Career";
import Skill from "../../models/actor/Skill";
import {useEffect, useState} from "react";
import CareerService from "../../services/CareerService";
import {useFetchCurrentSettingSkills} from "../skills/SkillWorkflow";

interface Props {
    car: Career
}

export default function EditSkillsCard(props: Props): JSX.Element {
    const {car} = props
    const [career, setCareer] = useState<Career>(car)

    useEffect(() => {
        setCareer(car)
    }, [car])

    const onSkillUpdate = () => {

    }

    const updateCareer = async (copyCareer: Career) => {
        setCareer(copyCareer)
        await CareerService.updateCareer(career.name, copyCareer)
    }

    return (
        <Card>
            <CenteredCardHeader title={'Skills'}/>
            <CardContent>
                <FormControl sx={{width: 500}}>
                    <InputLabel id="demo-multiple-checkbox-label">Skill</InputLabel>
                    <Select
                        labelId='Skill'
                        multiple
                        value={career.skills}
                        onChange={onSkillUpdate}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(', ')}
                    >
                        {useFetchCurrentSettingSkills().map((skill: Skill) => (
                            <MenuItem key={skill.name} value={skill.name}>
                                <Checkbox checked={career.skills.some(sk => sk.name === skill.name)} />
                                <ListItemText primary={skill.name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </CardContent>
        </Card>
    )
}