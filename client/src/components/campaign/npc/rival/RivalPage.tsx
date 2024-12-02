import {Card, CardContent, Divider, Grid} from "@mui/material";
import {useLocation, useParams} from "react-router-dom";
import {StatsType} from "../../../../models/actor/Stats";
import * as React from "react";
import Rival from "../../../../models/actor/npc/Rival";
import {getRatings, RatingType} from "../../../../models/actor/npc/NonPlayerActor";
import SingleNonPlayerCharacterSkillCard from "../skill/SingleNonPlayerCharacterSkillCard";
import SingleNonPlayerCharacterTalentCard from "../talent/SingleNonPlayerCharacterTalentCard";
import EquipmentCard from "../../actor/equipment/EquipmentCard";
import {ActorPath} from "../../../../services/RootPath";
import CharacteristicRow, {ActorCharacteristicRow} from "../../actor/common/CharacteristicRow";
import CenteredCardHeaderWithAction from "../../../common/card/header/CenteredCardHeaderWithAction";
import {CharacteristicType} from "../../../../models/character/Characteristic";
import {Fragment, useEffect, useState} from "react";
import RivalService from "../../../../services/actor/RivalService";
import {ViewFieldCard} from "../../../common/ViewFieldCard";
import {NumberTextFieldCard} from "../../../common/card/NumberTextField";
import {DefenseType} from "../../../../models/actor/Defense";
import {ActorSkill} from "../../../../models/actor/Actor";
import RatingCard from "../RatingCard";
import {ActorWeapon} from "../../../../models/equipment/Weapon";
import {ActorArmor} from "../../../../models/equipment/Armor";
import AbilityTableCard from "../../actor/ability/AbilityTableCard";
import Ability from "../../../../models/Ability";
import {ActorTalent} from "../../../../models/Talent";

export default function RivalPage() {
    const {id} = useParams<{ id: string }>();
    const [rival, setRival] = useState<Rival | null>(null);
    let pathname = useLocation().pathname;

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

    const handleCharacteristicChange = async (characteristic: CharacteristicType, value: number) => {
        if (rival) {
            switch (characteristic) {
                case CharacteristicType.Brawn:
                    setRival(await RivalService.updateRival({...rival, brawn: value}));
                    break;
                case CharacteristicType.Agility:
                    setRival(await RivalService.updateRival({...rival, agility: value}));
                    break;
                case CharacteristicType.Intellect:
                    setRival(await RivalService.updateRival({...rival, intellect: value}));
                    break;
                case CharacteristicType.Cunning:
                    setRival(await RivalService.updateRival({...rival, cunning: value}));
                    break;
                case CharacteristicType.Willpower:
                    setRival(await RivalService.updateRival({...rival, willpower: value}));
                    break;
                case CharacteristicType.Presence:
                    setRival(await RivalService.updateRival({...rival, presence: value}));
                    break;
            }
        }
    };

    const handleWoundsChange = async (value: number) => {
        if (rival) {
            setRival(await RivalService.updateRival({...rival, wounds: value}));
        }
    };

    const handleRatingsChange = async (value: number, type: RatingType) => {
        if (rival) {
            switch (type) {
                case RatingType.Combat:
                    setRival(await RivalService.updateRival({...rival, combat: value}));
                    break;
                case RatingType.Social:
                    setRival(await RivalService.updateRival({...rival, social: value}));
                    break;
                case RatingType.General:
                    setRival(await RivalService.updateRival({...rival, general: value}));
                    break;
            }
        }
    };

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

    const renderRatingRow = () => {
        if (pathname.endsWith(rival.id + '/edit')) {
            return (
                <Grid container spacing={2}>
                    <RatingCard type={RatingType.Combat} value={rival.combat}
                                onChange={handleRatingsChange}
                                disabled={!pathname.endsWith(rival.id + '/edit')}/>
                    <RatingCard type={RatingType.Social} value={rival.social}
                                onChange={handleRatingsChange}
                                disabled={!pathname.endsWith(rival.id + '/edit')}/>
                    <RatingCard type={RatingType.General} value={rival.general}
                                onChange={handleRatingsChange}
                                disabled={!pathname.endsWith(rival.id + '/edit')}/>
                </Grid>
            )
        }
        return <Fragment/>
    };

    const renderCharacteristicRow = () => {
        return pathname.endsWith(rival.id + '/edit') ?
            <ActorCharacteristicRow actor={rival} handleCharacteristicChange={handleCharacteristicChange}/> :
            <CharacteristicRow actor={rival}/>;
    };

    const renderWoundsCard = () => {
        return pathname.endsWith(rival.id + '/edit') ?
            <NumberTextFieldCard title={StatsType.Wounds + ' Threshold'} value={rival.wounds}
                                 onChange={handleWoundsChange} min={1} max={20}
                                 disabled={false}/> :
            <ViewFieldCard name={StatsType.Wounds + ' Threshold'} value={String(rival.wounds)}/>
    };

    return (
        <Card>
            <CenteredCardHeaderWithAction title={rival.name} path={ActorPath.Rival + rival.id}
                                          subheader={getRatings(rival)}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    {renderCharacteristicRow()}
                    <Divider/>
                    <Grid container spacing={2}>
                        <ViewFieldCard name={'Soak'} value={String(rival.soak)}/>
                        {renderWoundsCard()}
                        <ViewFieldCard name={DefenseType.Melee} value={String(rival.melee)}/>
                        <ViewFieldCard name={DefenseType.Ranged} value={String(rival.ranged)}/>
                    </Grid>
                    {renderRatingRow()}
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
