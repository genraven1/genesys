import {Card, CardContent, Divider, Grid} from "@mui/material";
import {useLocation, useParams} from "react-router-dom";
import {StatsType} from "../../../../models/actor/Stats";
import * as React from "react";
import Rival from "../../../../models/actor/npc/Rival";
import {getRatings} from "../../../../models/actor/npc/NonPlayerActor";
import RivalSkillCard from "./skill/RivalSkillCard";
import RivalTalentCard from "./talent/RivalTalentCard";
import RivalAbilityCard from "./ability/RivalAbilityCard";
import RivalEquipmentCard from "./equipment/RivalEquipmentCard";
import {ActorPath} from "../../../../services/RootPath";
import {ActorCharacteristicRow} from "../../common/CharacteristicRow";
import CenteredCardHeaderWithAction from "../../../common/card/CenteredCardHeaderWithAction";
import {CharacteristicType} from "../../../../models/character/Characteristic";
import {Fragment, useEffect, useState} from "react";
import ActorService from "../../../../services/ActorService";
import {ViewFieldCard} from "../../../common/ViewFieldCard";
import {NumberTextFieldCard} from "../../../common/card/NumberTextField";
import {DefenseType} from "../../../../models/actor/Defense";

export default function RivalPage() {
    const {id} = useParams<{ id: string }>();
    const [rival, setRival] = useState<Rival | null>(null);
    let pathname = useLocation().pathname

    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            setRival(await ActorService.getRival(id));
        })()
    }, [id, setRival])

    if (!rival) {
        return <Fragment/>;
    }

    const handleCharacteristicChange = async (characteristic: CharacteristicType, value: number) => {
        if (rival) {
            switch (characteristic) {
                case CharacteristicType.Brawn:
                    setRival(await ActorService.updateRival({...rival, brawn: value}));
                    break;
                case CharacteristicType.Agility:
                    setRival(await ActorService.updateRival({...rival, agility: value}));
                    break;
                case CharacteristicType.Intellect:
                    setRival(await ActorService.updateRival({...rival, intellect: value}));
                    break;
                case CharacteristicType.Cunning:
                    setRival(await ActorService.updateRival({...rival, cunning: value}));
                    break;
                case CharacteristicType.Willpower:
                    setRival(await ActorService.updateRival({...rival, willpower: value}));
                    break;
                case CharacteristicType.Presence:
                    setRival(await ActorService.updateRival({...rival, presence: value}));
                    break;
            }
        }
    };

    const handleWoundsChange = async (value: number) => {
        if (rival) {
            setRival(await ActorService.updateRival({...rival, wounds: value}));
        }
    };

    return (
        <Card>
            <CenteredCardHeaderWithAction title={rival.name} path={ActorPath.Rival + rival.id}
                                          subheader={getRatings(rival)}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <ActorCharacteristicRow actor={rival} handleCharacteristicChange={handleCharacteristicChange}/>
                    <Divider/>
                    <Grid container spacing={10}>
                        <ViewFieldCard name={'Soak'} value={String(rival.soak)}/>
                        <NumberTextFieldCard title={StatsType.Wounds + ' Threshold'} value={rival.wounds}
                                             onChange={handleWoundsChange} min={1} max={20}
                                             disabled={!pathname.endsWith(ActorPath.Rival + '/edit')}/>
                        <ViewFieldCard name={DefenseType.Melee} value={String(rival.melee)}/>
                        <ViewFieldCard name={DefenseType.Ranged} value={String(rival.ranged)}/>
                    </Grid>
                    <Divider/>
                    <RivalSkillCard rival={rival}/>
                    <Divider/>
                    <RivalEquipmentCard rival={rival}/>
                    <Divider/>
                    <RivalAbilityCard rival={rival}/>
                    <Divider/>
                    <RivalTalentCard rival={rival}/>
                </Grid>
            </CardContent>
        </Card>
    )
}
