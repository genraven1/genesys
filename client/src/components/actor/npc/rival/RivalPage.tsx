import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {StatsType} from "../../../../models/actor/Stats";
import NonPlayerActorSoakCard from "../NonPlayerActorSoakCard";
import * as React from "react";
import GenesysDescriptionTypography from "../../../common/typography/GenesysDescriptionTypography";
import EditIcon from "@mui/icons-material/Edit";
import Rival from "../../../../models/actor/npc/Rival";
import { getRatings } from "../../../../models/actor/npc/NonPlayerActor";
import RivalSkillCard from "./skill/RivalSkillCard";
import RivalTalentCard from "./talent/RivalTalentCard";
import RivalAbilityCard from "./ability/RivalAbilityCard";
import RivalEquipmentCard from "./equipment/RivalEquipmentCard";
import NonPlayerActorDefenseCard from "../NonPlayerActorDefenseCard";
import {ActorPath} from "../../../../services/RootPath";
import CharacteristicRow, {ActorCharacteristicRow} from "../../common/CharacteristicRow";
import {ViewStatsCard} from "../../StatsCard";
import CenteredCardHeaderWithAction from "../../../common/card/CenteredCardHeaderWithAction";
import {CharacteristicType} from "../../../../models/character/Characteristic";
import ArchetypeService from "../../../../services/ArchetypeService";
import {Fragment, useEffect, useState} from "react";
import Player from "../../../../models/actor/player/Player";
import ActorService from "../../../../services/ActorService";
import {ViewFieldCard} from "../../../common/ViewFieldCard";

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

    return (
        <Card>
            <CenteredCardHeaderWithAction title={rival.name} path={ActorPath.Rival + rival.id} subheader={getRatings(rival)}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <ActorCharacteristicRow actor={rival} handleCharacteristicChange={handleCharacteristicChange}/>
                    {/*<CharacteristicRow actor={rival}/>*/}
                    <Divider />
                    <Grid container spacing={10}>
                        <ViewFieldCard name={'Soak'} value={String(rival.soak)}/>
                        <NonPlayerActorSoakCard actor={rival} />
                        <ViewStatsCard stats={rival.wounds} type={StatsType.Wounds}/>
                        <NonPlayerActorDefenseCard npc={rival}/>
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
