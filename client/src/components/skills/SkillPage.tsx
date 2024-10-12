import Skill, {SkillType} from "../../models/actor/Skill";
import {Card, CardContent, Grid} from "@mui/material";
import {RootPath} from "../../services/Path";
import * as React from "react";
import {useLocation, useParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import SkillService from "../../services/SkillService";
import {CharacteristicType} from "../../models/character/Characteristic";
import CenteredCardHeaderWithAction from "../common/card/CenteredCardHeaderWithAction";
import SkillTypeCard from "../common/card/select/SkillTypeCard";
import CharacteristicTypeCard from "../common/card/select/CharacteristicTypeCard";

export default function SkillPage() {
    const {id} = useParams<{ id: string }>()
    const [skill, setSkill] = useState<Skill | null>(null)
    let pathname = useLocation().pathname

    useEffect(() => {
        if (!id) {
            return;
        }
        (async (): Promise<void> => {
            setSkill(await SkillService.getSkill(id));
        })()
    }, [id, setSkill]);

    if (!skill) {
        return <Fragment/>;
    }

    const handleSkillTypeChange = async (value: SkillType) => {
        if (skill) {
            const updatedSkill = {...skill, type: value};
            setSkill(await SkillService.updateSkill(updatedSkill));
        }
    };

    const handleCharacteristicTypeChange = async (value: CharacteristicType) => {
        if (skill) {
            const updatedSkill = {...skill, characteristic: value};
            setSkill(await SkillService.updateSkill(updatedSkill));
        }
    };

    return (
        <Card>
            <CenteredCardHeaderWithAction title={skill.name} path={RootPath.Skills}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <SkillTypeCard value={skill.type} onChange={handleSkillTypeChange}
                                   disabled={pathname.endsWith('/view')}/>
                    <CharacteristicTypeCard value={skill.characteristic} onChange={handleCharacteristicTypeChange}
                                            disabled={pathname.endsWith('/view')}/>
                </Grid>
            </CardContent>
        </Card>
    );
}