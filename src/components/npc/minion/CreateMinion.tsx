import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid } from "@mui/material";
import { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wounds } from "../../../models/Actor";
import { CharacteristicType, Characteristic } from "../../../models/Characteristics";
import Minion, { DefaultMinion } from "../../../models/Minion";
import { Rating, RatingType } from "../../../models/NonPlayerCharacter";
import InlineTextField from "../../input/TextField";
import { CharacteristicBox } from "../CharacteristicBox";
import { RatingBox } from "../RatingBox";
import { SoakBox } from "../SoakBox";
import { CreateWoundsBox } from "../WoundsBox";

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
                break;
            case CharacteristicType.Agility:
                setMinion((prev_state) => ({
                    ...prev_state,
                    agility: characteristic,
                }));
                break;
            case CharacteristicType.Intellect:
                setMinion((prev_state) => ({
                    ...prev_state,
                    intellect: characteristic,
                }));
                break;
            case CharacteristicType.Cunning:
                setMinion((prev_state) => ({
                    ...prev_state,
                    cunning: characteristic,
                }));
                break;
            case CharacteristicType.Willpower:
                setMinion((prev_state) => ({
                    ...prev_state,
                    willpower: characteristic,
                }));
                break;
            case CharacteristicType.Presence:
                setMinion((prev_state) => ({
                    ...prev_state,
                    presence: characteristic,
                }));
                break;
        }
    }

    const updateMinionRatings = (rating: Rating) => {
        switch (rating.type) {
            case RatingType.CombatRating:
                setMinion((prev_state) => ({
                    ...prev_state,
                    combatRating: rating,
                }));
                break;
            case RatingType.SocialRating:
                setMinion((prev_state) => ({
                    ...prev_state,
                    socialRating: rating,
                }));
                break;
            case RatingType.GeneralRating:
                setMinion((prev_state) => ({
                    ...prev_state,
                    generalRating: rating,
                }));
                break;
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
                            <Grid item xs>
                                <Card>
                                    <CardHeader title={'Name'} style={{ textAlign: 'center' }} />
                                    <Divider />
                                    <InlineTextField defaultValue={''} editable={true} onCommit={handleOnCommit} 
                                    validate={(value: string): boolean => value.trim() !== ''} helperText={'Name'} 
                                    placeholder={'Name'} errorText={''} />
                                </Card>
                            </Grid>
                            <RatingBox updatedRating={minion.combatRating} onRatingUpdate={updateMinionRatings} />
                            <RatingBox updatedRating={minion.socialRating} onRatingUpdate={updateMinionRatings} />
                            <RatingBox updatedRating={minion.generalRating} onRatingUpdate={updateMinionRatings} />
                        </Grid>
                        <Divider />
                        <Grid container spacing={10}>
                            <CharacteristicBox newCharacteristic={minion.brawn} type={CharacteristicType.Brawn} onCharacteristicUpdate={updateMinionCharacteristic} />
                            <CharacteristicBox newCharacteristic={minion.agility} type={CharacteristicType.Agility} onCharacteristicUpdate={updateMinionCharacteristic} />
                            <CharacteristicBox newCharacteristic={minion.intellect} type={CharacteristicType.Intellect} onCharacteristicUpdate={updateMinionCharacteristic} />
                            <CharacteristicBox newCharacteristic={minion.cunning} type={CharacteristicType.Cunning} onCharacteristicUpdate={updateMinionCharacteristic} />
                            <CharacteristicBox newCharacteristic={minion.willpower} type={CharacteristicType.Willpower} onCharacteristicUpdate={updateMinionCharacteristic} />
                            <CharacteristicBox newCharacteristic={minion.presence} type={CharacteristicType.Presence} onCharacteristicUpdate={updateMinionCharacteristic} />
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