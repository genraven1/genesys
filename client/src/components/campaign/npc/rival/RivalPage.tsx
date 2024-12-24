import {Card, CardContent, Divider, Grid} from "@mui/material";
import {useParams} from "react-router-dom";
import * as React from "react";
import Rival from "../../../../models/actor/npc/Rival";
import {getRatings} from "../../../../models/actor/npc/NonPlayerActor";
import SingleNonPlayerCharacterSkillCard from "../skill/SingleNonPlayerCharacterSkillCard";
import SingleNonPlayerCharacterTalentCard from "../talent/SingleNonPlayerCharacterTalentCard";
import EquipmentCard from "../../actor/equipment/EquipmentCard";
import {ActorPath} from "../../../../services/RootPath";
import CenteredCardHeaderWithAction from "../../../common/card/header/CenteredCardHeaderWithAction";
import {Fragment, useEffect, useState} from "react";
import RivalService from "../../../../services/actor/RivalService";
import {ActorSkill} from "../../../../models/actor/Actor";
import {ActorWeapon} from "../../../../models/equipment/Weapon";
import {ActorArmor} from "../../../../models/equipment/Armor";
import AbilityTableCard from "../../actor/ability/AbilityTableCard";
import Ability from "../../../../models/Ability";
import {ActorTalent} from "../../../../models/Talent";
import RivalCharacteristicTab from "./RivalCharacteristicTab";

export default function RivalPage() {
    const {id} = useParams<{ id: string }>();
    const [rival, setRival] = useState<Rival | null>(null);

    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            setRival(await RivalService.getRival(id));
        })()
    }, [id, setRival])

    if (!rival) {
        return <Fragment/>;
    }

    const handleSkillChange = async (value: ActorSkill) => {
        if (rival) {
            setRival(await RivalService.updateRivalSkill(rival.id, value));
        }
    };

    const handleArmorChange = async (value: ActorArmor[]) => {
        if (rival) {
            setRival(await RivalService.updateRival({...rival, armors: value}));
        }
    };

    const handleWeaponChange = async (value: ActorWeapon[]) => {
        if (rival) {
            setRival(await RivalService.updateRival({...rival, weapons: value}));
        }
    };

    const handleAbilityChange = async (values: Ability[]) => {
        if (rival) {
            setRival(await RivalService.updateRival({...rival, abilities: values}));
        }
    };

    const handleTalentChange = async (values: ActorTalent[]) => {
        if (rival) {
            setRival(await RivalService.updateRival({...rival, talents: values}));
        }
    };

    return (
        <Card>
            <CenteredCardHeaderWithAction title={rival.name} path={ActorPath.Rival + rival.id}
                                          subheader={getRatings(rival)}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <RivalCharacteristicTab rival={rival} updateRival={setRival}/>
                    <Divider/>
                    <SingleNonPlayerCharacterSkillCard actor={rival} onSkillChange={handleSkillChange}/>
                    <Divider/>
                    <EquipmentCard actor={rival} updateArmors={handleArmorChange} updateWeapons={handleWeaponChange}/>
                    <Divider/>
                    <AbilityTableCard abilities={rival.abilities} updateAbilities={handleAbilityChange}/>
                    <Divider/>
                    <SingleNonPlayerCharacterTalentCard talents={rival.talents} updateTalents={handleTalentChange}/>
                </Grid>
            </CardContent>
        </Card>
    )
}
