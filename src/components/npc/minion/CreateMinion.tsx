import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, TextField } from "@mui/material";
import { ChangeEventHandler, FocusEventHandler, FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wounds } from "../../../models/Actor";
import { CharacteristicType, Characteristic } from "../../../models/Characteristics";
import Minion, { DefaultMinion } from "../../../models/Minion";
import { Rating, RatingType } from "../../../models/NonPlayerCharacter";
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

    const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
        const { name, value } = event.target;

        setMinion((prev_state) => ({
            ...prev_state,
            [name]: value,
        }));
        updateSoak(minion);
    }

    const handleTextChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const { name, value } = event.target;

        setMinion((prev_state) => ({
            ...prev_state,
            [name]: value,
        }));
    }

    const updateMinionCharacteristic = (characteristic: Characteristic) => {
        let characteristicList = minion.characteristics;

        characteristicList[characteristicList.findIndex((char) => char.label === characteristic.label)] = characteristic;

        setMinion((prev_state) => ({
            ...prev_state,
            characteristics: characteristicList,
        }));

        updateSoak(minion);
    }

    const updateMinionWounds = (wounds: Wounds) => {
        setMinion((prev_state) => ({
            ...prev_state,
            wounds: wounds,
        }));
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
            soak: minion.characteristics[0].currentValue,
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
                                    <TextField name='name' label='Name' value={minion.name ?? ''} onBlur={handleBlur} onChange={handleTextChange} fullWidth />
                                </Card>
                            </Grid>
                            <RatingBox updatedRating={minion.combatRating} onRatingUpdate={updateMinionRatings} />
                            <RatingBox updatedRating={minion.socialRating} onRatingUpdate={updateMinionRatings} />
                            <RatingBox updatedRating={minion.generalRating} onRatingUpdate={updateMinionRatings} />
                        </Grid>
                        <Divider />
                        <Grid container spacing={10}>
                            <CharacteristicBox newCharacteristic={minion.characteristics[0]} type={CharacteristicType.Brawn} onCharacteristicUpdate={updateMinionCharacteristic} />
                            <CharacteristicBox newCharacteristic={minion.characteristics[1]} type={CharacteristicType.Agility} onCharacteristicUpdate={updateMinionCharacteristic} />
                            <CharacteristicBox newCharacteristic={minion.characteristics[2]} type={CharacteristicType.Intellect} onCharacteristicUpdate={updateMinionCharacteristic} />
                            <CharacteristicBox newCharacteristic={minion.characteristics[3]} type={CharacteristicType.Cunning} onCharacteristicUpdate={updateMinionCharacteristic} />
                            <CharacteristicBox newCharacteristic={minion.characteristics[4]} type={CharacteristicType.Willpower} onCharacteristicUpdate={updateMinionCharacteristic} />
                            <CharacteristicBox newCharacteristic={minion.characteristics[5]} type={CharacteristicType.Presence} onCharacteristicUpdate={updateMinionCharacteristic} />
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