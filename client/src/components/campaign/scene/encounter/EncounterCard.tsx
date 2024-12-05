import {Card, CardContent} from "@mui/material";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader";
import * as React from "react";
import {useEffect, useState} from "react";
import {SingleNonPlayerCharacter} from "../../../../models/actor/npc/NonPlayerActor";
import SceneService from "../../../../services/SceneService";
import Scene from "../../../../models/campaign/Scene";
import InitiativeTrackCard from "./InitiativeTrackCard";

interface Props {
    scene: Scene
}

export default function EncounterCard(props: Props) {
    const {scene} = props;
    const [singleNonPlayerCharacters, setSingleNonPlayerCharacters] = useState<SingleNonPlayerCharacter[]>([]);
    // const [value, setValue] = useState('1');

    useEffect(() => {
        (async (): Promise<void> => {
            const minions = await SceneService.getEnemyMinionsForScene(scene.id);
            const rivals = await SceneService.getEnemyRivalsForScene(scene.id);
            const nemeses = await SceneService.getEnemyNemesesForScene(scene.id);
            const combinedEnemies = [
                ...minions.map(minion => ({...minion})),
                ...rivals.map(rival => ({...rival})),
                ...nemeses.map(nemesis => ({...nemesis}))
            ];
            setSingleNonPlayerCharacters(combinedEnemies);
        })();
    }, [scene]);

    // const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    //     setValue(newValue);
    // };

    return (
        <Card>
            <CenteredCardHeader title={'Encounters'}/>
            <CardContent>
                <InitiativeTrackCard npcs={singleNonPlayerCharacters}/>
            </CardContent>
        </Card>
    );
}