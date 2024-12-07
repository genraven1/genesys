import {Button, Card, CardContent, Grid} from "@mui/material";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader";
import {SingleNonPlayerCharacter} from "../../../../models/actor/npc/NonPlayerActor";
import * as React from "react";
import NonPlayerCharacterInitiativeCard from "./NonPlayerCharacterInitiativeCard";
import AddNonPlayerCharacterToSceneDialog from "../npc/AddNonPlayerCharacterToSceneDialog";
import {ActorSkill} from "../../../../models/actor/Actor";
import {useState} from "react";
import {basicSkillDicePool} from "../../../../models/roll/dice/DicePool";
import handleDicePoolRoll from "../../../roll/DicePoolRoll";
import {GenesysSymbols} from "../../../../models/roll/GenesysSymbols";

interface Props {
    npcs: SingleNonPlayerCharacter[]
}

export default function InitiativeTrackCard(props: Props) {
    const {npcs} = props;
    const [skills, setSkills] = useState<{ id: string, skill: ActorSkill }[]>([]);

    const handleSkillChange = (index: number, skill: ActorSkill) => {
        setSkills(prev => ({...prev, [String(index)]: skill}));
    };

    const rollInitiative = () => {
        npcs.forEach((npc, index) => {
            const skill = skills[index];
            const symbols: Record<GenesysSymbols, number> = {
                [GenesysSymbols.Success]: 0,
                [GenesysSymbols.Advantage]: 0,
                [GenesysSymbols.Triumph]: 0,
                [GenesysSymbols.Failure]: 0,
                [GenesysSymbols.Threat]: 0,
                [GenesysSymbols.Despair]: 0,
                [GenesysSymbols.Blank]: 0,
            };
            handleDicePoolRoll({dice: basicSkillDicePool(npc, skill.skill), symbols})
        });
    };

    return (
        <Card>
            <CenteredCardHeader title={'Initiative'}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    {npcs.map((npc, index) => (
                        <NonPlayerCharacterInitiativeCard npc={npc} onChange={handleSkillChange} index={index}/>
                    ))}
                </Grid>
                <Grid container justifyContent={'center'}>
                    <Button color='primary' variant='contained' onClick={rollInitiative}>Roll Initiative</Button>
                </Grid>
            </CardContent>
        </Card>
    );
}