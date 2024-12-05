import {SingleNonPlayerCharacter} from "../../../../models/actor/npc/NonPlayerActor";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader";
import {Card, CardContent, MenuItem, Select} from "@mui/material";
import * as React from "react";
import {getCharacteristicRanks} from "../../../../models/actor/Actor";
import GenesysSkillDiceTypography from "../../../common/typography/GenesysSkillDiceTypography";
import Typography from "@mui/material/Typography";

interface Props {
    npc: SingleNonPlayerCharacter
}

export default function NonPlayerCharacterInitiativeCard(props: Props) {
    const {npc} = props;

    return (
        <Card>
            <CenteredCardHeader title={npc.name}/>
            <CardContent>
                <Select
                    // onChange={(e) => onChange(e.target.value as Difficulty)}
                    fullWidth
                    label={'Skill'}
                >
                    {npc.skills.filter(skill => skill.initiative).map(skill => (
                        <MenuItem value={skill.name}>
                            <Typography>{skill.name}</Typography>
                            <GenesysSkillDiceTypography characteristicRanks={getCharacteristicRanks(npc, skill)}
                                                        skillRanks={skill.ranks}/>
                        </MenuItem>
                    ))}
                </Select>
            </CardContent>
        </Card>
    )
}