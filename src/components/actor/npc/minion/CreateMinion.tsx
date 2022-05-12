import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid } from "@mui/material";
import { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wounds } from "../../../../models/actor/Actor";
import { CharacteristicType, Characteristic } from "../../../../models/actor/Characteristics";
import Minion, { DefaultMinion } from "../../../../models/actor/Minion";
import { Rating, RatingType } from "../../../../models/actor/NonPlayerCharacter";
import InputTextFieldCard from "../../../input/InputTextFieldCard";
import CharacteristicBox from "../../CharacteristicBox";
import RatingBox from "../../RatingBox";
import SoakBox from "../../SoakBox";
import CreateWoundsBox from "../../WoundsBox";

interface Props {
    minion?: Minion | null,
}

export default function CreateMinion(props: Props) {
    const { minion: newMinion } = props;
    const [minion, setMinion] = useState(newMinion ?? DefaultMinion.create());
    const [errors, setErrors] = useState({} as any);
    let navigate = useNavigate();

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        console.log(minion);
        //ActorService.createMinion(minion);
        //navigate('/actors/npcs/minions/' + minion.id);
    }

    const updateMinionCharacteristic = (characteristic: Characteristic) => {
        switch (characteristic.type) {
            case CharacteristicType.Brawn:
                setMinion((prev_state) => ({
                    ...prev_state,
                    brawn: characteristic,
                }));
                updateSoak(minion);
                return minion.brawn;
            case CharacteristicType.Agility:
                setMinion((prev_state) => ({
                    ...prev_state,
                    agility: characteristic,
                }));
                return minion.agility;
            case CharacteristicType.Intellect:
                setMinion((prev_state) => ({
                    ...prev_state,
                    intellect: characteristic,
                }));
                return minion.intellect;
            case CharacteristicType.Cunning:
                setMinion((prev_state) => ({
                    ...prev_state,
                    cunning: characteristic,
                }));
                return minion.cunning;
            case CharacteristicType.Willpower:
                setMinion((prev_state) => ({
                    ...prev_state,
                    willpower: characteristic,
                }));
                return minion.willpower;
            case CharacteristicType.Presence:
                setMinion((prev_state) => ({
                    ...prev_state,
                    presence: characteristic,
                }));
                return minion.presence;
        }
    }

    const updateMinionRatings = (rating: Rating) => {
        switch (rating.type) {
            case RatingType.CombatRating:
                setMinion((prev_state) => ({
                    ...prev_state,
                    combatRating: rating,
                }));
                return minion.combatRating;
            case RatingType.SocialRating:
                setMinion((prev_state) => ({
                    ...prev_state,
                    socialRating: rating,
                }));
                return minion.socialRating;
            case RatingType.GeneralRating:
                setMinion((prev_state) => ({
                    ...prev_state,
                    generalRating: rating,
                }));
                return minion.generalRating;
        }
    }

    const updateSoak = (minion: Minion) => {
        setMinion((prev_state) => ({
            ...prev_state,
            soak: minion.brawn.currentValue,
        }));
    }

    const updateMinionWounds = (wounds: Wounds) => {
        setMinion((prev_state) => ({
            ...prev_state,
            wounds: wounds,
        }));
        return minion.wounds;
    }

    const handleOnCommit = (value: string) => {
        setMinion((prev_state) => ({
            ...prev_state,
            name: value,
        }));
    }

    return (
        <Card>
            <CardHeader title={'Create Minion'} />
            <Divider />
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <Grid container justifyContent={'center'}>
                        <Grid container spacing={10}>
                            <InputTextFieldCard defaultValue={'Name'} onCommit={handleOnCommit} title={'Name'} helperText={'Name'} placeholder={'Name'} />
                            <RatingBox updatedRating={minion.combatRating} onRatingUpdate={updateMinionRatings} />
                            <RatingBox updatedRating={minion.socialRating} onRatingUpdate={updateMinionRatings} />
                            <RatingBox updatedRating={minion.generalRating} onRatingUpdate={updateMinionRatings} />
                        </Grid>
                        <Divider />
                        <Grid container spacing={10}>
                            <CharacteristicBox newCharacteristic={minion.brawn} onCharacteristicUpdate={updateMinionCharacteristic} />
                            <CharacteristicBox newCharacteristic={minion.agility} onCharacteristicUpdate={updateMinionCharacteristic} />
                            <CharacteristicBox newCharacteristic={minion.intellect} onCharacteristicUpdate={updateMinionCharacteristic} />
                            <CharacteristicBox newCharacteristic={minion.cunning}  onCharacteristicUpdate={updateMinionCharacteristic} />
                            <CharacteristicBox newCharacteristic={minion.willpower} onCharacteristicUpdate={updateMinionCharacteristic} />
                            <CharacteristicBox newCharacteristic={minion.presence} onCharacteristicUpdate={updateMinionCharacteristic} />
                        </Grid>
                        <Divider />
                        <Grid container spacing={10}>
                            <CreateWoundsBox newWounds={minion.wounds} onWoundsUpdate={updateMinionWounds} />
                            <SoakBox soak={minion.soak} />
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button color='primary' type='submit'>CREATE</Button>
                </CardActions>
            </form>
        </Card>
    )
}