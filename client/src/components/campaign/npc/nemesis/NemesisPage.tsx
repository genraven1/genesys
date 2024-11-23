import {useLocation, useParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import ActorService from "../../../../services/ActorService";
import * as React from "react";
import Nemesis from "../../../../models/actor/npc/Nemesis";
import {Card, CardContent, Divider, Grid} from "@mui/material";
import CenteredCardHeaderWithAction from "../../../common/card/header/CenteredCardHeaderWithAction";
import {ActorPath} from "../../../../services/RootPath";
import {getRatings, RatingType} from "../../../../models/actor/npc/NonPlayerActor";
import CharacteristicRow, {ActorCharacteristicRow} from "../../actor/common/CharacteristicRow";
import {ViewFieldCard} from "../../../common/ViewFieldCard";
import {NumberTextFieldCard} from "../../../common/card/NumberTextField";
import {StatsType} from "../../../../models/actor/Stats";
import {DefenseType} from "../../../../models/actor/Defense";
import SingleNonPlayerCharacterSkillCard from "../skill/SingleNonPlayerCharacterSkillCard";
import EquipmentCard from "../../actor/equipment/EquipmentCard";
import AbilityTableCard from "../../actor/ability/AbilityTableCard";
import SingleNonPlayerCharacterTalentCard from "../talent/SingleNonPlayerCharacterTalentCard";
import RatingCard from "../RatingCard";
import {CharacteristicType} from "../../../../models/character/Characteristic";
import {ActorSkill} from "../../../../models/actor/Actor";
import {ActorArmor} from "../../../../models/equipment/Armor";
import {ActorWeapon} from "../../../../models/equipment/Weapon";
import Ability from "../../../../models/Ability";
import {ActorTalent} from "../../../../models/Talent";

export default function NemesisPage() {
    const {id} = useParams<{ id: string }>();
    const [nemesis, setNemesis] = useState<Nemesis | null>(null);
    let pathname = useLocation().pathname;

    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            setNemesis(await ActorService.getNemesis(id));
        })()
    }, [id, setNemesis])

    if (!nemesis) {
        return <Fragment/>;
    }

    const handleCharacteristicChange = async (characteristic: CharacteristicType, value: number) => {
        if (nemesis) {
            switch (characteristic) {
                case CharacteristicType.Brawn:
                    setNemesis(await ActorService.updateNemesis({...nemesis, brawn: value}));
                    break;
                case CharacteristicType.Agility:
                    setNemesis(await ActorService.updateNemesis({...nemesis, agility: value}));
                    break;
                case CharacteristicType.Intellect:
                    setNemesis(await ActorService.updateNemesis({...nemesis, intellect: value}));
                    break;
                case CharacteristicType.Cunning:
                    setNemesis(await ActorService.updateNemesis({...nemesis, cunning: value}));
                    break;
                case CharacteristicType.Willpower:
                    setNemesis(await ActorService.updateNemesis({...nemesis, willpower: value}));
                    break;
                case CharacteristicType.Presence:
                    setNemesis(await ActorService.updateNemesis({...nemesis, presence: value}));
                    break;
            }
        }
    };

    const handleWoundsChange = async (value: number) => {
        if (nemesis) {
            setNemesis(await ActorService.updateNemesis({...nemesis, wounds: value}));
        }
    };

    const handleStrainChange = async (value: number) => {
        if (nemesis) {
            setNemesis(await ActorService.updateNemesis({...nemesis, strain: value}));
        }
    };

    const handleRatingsChange = async (value: number, type: RatingType) => {
        if (nemesis) {
            switch (type) {
                case RatingType.Combat:
                    setNemesis(await ActorService.updateNemesis({...nemesis, combat: value}));
                    break;
                case RatingType.Social:
                    setNemesis(await ActorService.updateNemesis({...nemesis, social: value}));
                    break;
                case RatingType.General:
                    setNemesis(await ActorService.updateNemesis({...nemesis, general: value}));
                    break;
            }
        }
    };

    const handleSkillChange = async (value: ActorSkill) => {
        if (nemesis) {
            setNemesis(await ActorService.updateNemesisSkill(nemesis.id, value));
        }
    };

    const handleArmorChange = async (value: ActorArmor[]) => {
        if (nemesis) {
            setNemesis(await ActorService.updateNemesis({...nemesis, armors: value}));
        }
    };

    const handleWeaponChange = async (value: ActorWeapon[]) => {
        if (nemesis) {
            setNemesis(await ActorService.updateNemesis({...nemesis, weapons: value}));
        }
    };

    const handleAbilityChange = async (values: Ability[]) => {
        if (nemesis) {
            setNemesis(await ActorService.updateNemesis({...nemesis, abilities: values}));
        }
    };

    const handleTalentChange = async (values: ActorTalent[]) => {
        if (nemesis) {
            setNemesis(await ActorService.updateNemesis({...nemesis, talents: values}));
        }
    };

    const renderRatingRow = () => {
        if (pathname.endsWith(nemesis.id + '/edit')) {
            return (
                <Grid container spacing={2}>
                    <RatingCard type={RatingType.Combat} value={nemesis.combat}
                                onChange={handleRatingsChange}
                                disabled={!pathname.endsWith(nemesis.id + '/edit')}/>
                    <RatingCard type={RatingType.Social} value={nemesis.social}
                                onChange={handleRatingsChange}
                                disabled={!pathname.endsWith(nemesis.id + '/edit')}/>
                    <RatingCard type={RatingType.General} value={nemesis.general}
                                onChange={handleRatingsChange}
                                disabled={!pathname.endsWith(nemesis.id + '/edit')}/>
                </Grid>
            )
        }
        return <Fragment/>
    };

    const renderCharacteristicRow = () => {
        return pathname.endsWith(nemesis.id + '/edit') ?
            <ActorCharacteristicRow actor={nemesis} handleCharacteristicChange={handleCharacteristicChange}/> :
            <CharacteristicRow actor={nemesis}/>;
    };

    const renderWoundsCard = () => {
        return pathname.endsWith(nemesis.id + '/edit') ?
            <NumberTextFieldCard title={StatsType.Wounds + ' Threshold'} value={nemesis.wounds}
                                 onChange={handleWoundsChange} min={1} max={35}
                                 disabled={false}/> :
            <ViewFieldCard name={StatsType.Wounds + ' Threshold'} value={String(nemesis.wounds)}/>
    };

    const renderStrainCard = () => {
        return pathname.endsWith(nemesis.id + '/edit') ?
            <NumberTextFieldCard title={StatsType.Strain + ' Threshold'} value={nemesis.strain}
                                 onChange={handleStrainChange} min={1} max={35}
                                 disabled={false}/> :
            <ViewFieldCard name={StatsType.Strain + ' Threshold'} value={String(nemesis.strain)}/>
    };

    return (
        <Card>
            <CenteredCardHeaderWithAction title={nemesis.name} path={ActorPath.Nemesis + nemesis.id}
                                          subheader={getRatings(nemesis)}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    {renderCharacteristicRow()}
                    <Divider/>
                    <Grid container spacing={2}>
                        <ViewFieldCard name={'Soak'} value={String(nemesis.soak)}/>
                        {renderWoundsCard()}
                        {renderStrainCard()}
                        <ViewFieldCard name={DefenseType.Melee} value={String(nemesis.melee)}/>
                        <ViewFieldCard name={DefenseType.Ranged} value={String(nemesis.ranged)}/>
                    </Grid>
                    {renderRatingRow()}
                    <Divider/>
                    <SingleNonPlayerCharacterSkillCard actor={nemesis} onSkillChange={handleSkillChange}/>
                    <Divider/>
                    <EquipmentCard actor={nemesis} updateArmors={handleArmorChange} updateWeapons={handleWeaponChange}/>
                    <Divider/>
                    <AbilityTableCard abilities={nemesis.abilities} updateAbilities={handleAbilityChange}/>
                    <Divider/>
                    <SingleNonPlayerCharacterTalentCard talents={nemesis.talents} updateTalents={handleTalentChange}/>
                </Grid>
            </CardContent>
        </Card>
    )
}