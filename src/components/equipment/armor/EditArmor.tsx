import {Button, Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';
import {Armor, DefaultArmor} from "../../../models/equipment/Equipment";
import EquipmentService from "../../../services/EquipmentService";
import {Path} from "../../../services/Path";

export default function EditArmor() {
    const { name } = useParams<{ name: string }>();
    const [armor, setArmor] = useState<Armor | null>(null);
    const [errors, setErrors] = useState({} as any);
    let navigate = useNavigate()

    useEffect(() => {
        if (!name) {
            return;
        }
        (async (): Promise<void> => {
            const armorData = await EquipmentService.getArmor(name);
            if (!armorData) {return}
            setArmor(armorData);
        })();
    }, [name])

    function getName(armor: Armor | null): string {
        if (!armor) {
            return 'Armor View'
        }
        return armor.name
    }

    function getArmor(armor: Armor | null): Armor {
        if (!armor) {
            return DefaultArmor.create();
        }
        return armor
    }

    // const onCharacteristicChange = (copyNemesis: Nemesis, value: number, type: CharacteristicType) => {
    //     switch (type) {
    //         case CharacteristicType.Brawn:
    //             copyNemesis.brawn.current = value
    //             break;
    //         case CharacteristicType.Agility:
    //             copyNemesis.agility.current = value
    //             break;
    //         case CharacteristicType.Intellect:
    //             copyNemesis.intellect.current = value
    //             break;
    //         case CharacteristicType.Cunning:
    //             copyNemesis.cunning.current = value
    //             break;
    //         case CharacteristicType.Willpower:
    //             copyNemesis.willpower.current = value
    //             break;
    //         case CharacteristicType.Presence:
    //             copyNemesis.presence.current = value
    //             break;
    //     }
    // }
    //
    // const onStatChange = (copyNemesis: Nemesis, value: number, type: StatsType) => {
    //     switch (type) {
    //         case StatsType.Wounds:
    //             copyNemesis.wounds.max = value
    //             break;
    //         case StatsType.Strain:
    //             copyNemesis.strain.max = value
    //             break;
    //     }
    // }
    //
    // const onDefenseChange = (copyNemesis: Nemesis, value: number, type: DefenseType) => {
    //     switch (type) {
    //         case DefenseType.Melee:
    //             copyNemesis.melee.current = value
    //             break;
    //         case DefenseType.Ranged:
    //             copyNemesis.ranged.current = value
    //             break;
    //     }
    // }
    //
    // const onRatingChange = (copyNemesis: Nemesis, value: number, type: RatingType) => {
    //     switch (type) {
    //         case RatingType.Combat:
    //             copyNemesis.combat = value
    //             break
    //         case RatingType.Social:
    //             copyNemesis.social = value
    //             break
    //         case RatingType.General:
    //             copyNemesis.general = value
    //             break
    //     }
    // }
    //
    // const onChange = async (key: keyof Nemesis, value: number) => {
    //     if (value === null || (nemesis !== null && nemesis[key] === value)) {
    //         return;
    //     }
    //     const copyNemesis = {...nemesis} as Nemesis
    //     switch (key) {
    //         case "brawn":
    //             onCharacteristicChange(copyNemesis, value, CharacteristicType.Brawn)
    //             break;
    //         case "agility":
    //             onCharacteristicChange(copyNemesis, value, CharacteristicType.Agility)
    //             break;
    //         case "intellect":
    //             onCharacteristicChange(copyNemesis, value, CharacteristicType.Intellect)
    //             break;
    //         case "cunning":
    //             onCharacteristicChange(copyNemesis, value, CharacteristicType.Cunning)
    //             break;
    //         case "willpower":
    //             onCharacteristicChange(copyNemesis, value, CharacteristicType.Willpower)
    //             break;
    //         case "presence":
    //             onCharacteristicChange(copyNemesis, value, CharacteristicType.Presence)
    //             break;
    //         case 'talents':
    //             break
    //         case "soak":
    //             copyNemesis.soak = copyNemesis.brawn.current
    //             break;
    //         case "melee":
    //             onDefenseChange(copyNemesis, value, DefenseType.Melee)
    //             break;
    //         case "ranged":
    //             onDefenseChange(copyNemesis, value, DefenseType.Ranged)
    //             break;
    //         case "wounds":
    //             onStatChange(copyNemesis, value, StatsType.Wounds)
    //             break;
    //         case "strain":
    //             onStatChange(copyNemesis, value, StatsType.Strain)
    //             break;
    //         case "combat":
    //             onRatingChange(copyNemesis, value, RatingType.Combat)
    //             break
    //         case "social":
    //             onRatingChange(copyNemesis, value, RatingType.Social)
    //             break
    //         case "general":
    //             onRatingChange(copyNemesis, value, RatingType.General)
    //             break
    //         case "name":
    //             break;
    //     }
    //
    //     await updateNemesis(copyNemesis)
    // }
    //
    // const updateNemesis = async (copyNemesis: Nemesis): Promise<Nemesis> => {
    //     copyNemesis.soak = copyNemesis.brawn.current
    //     setNemesis(copyNemesis)
    //     await ActorService.updateNemesis(copyNemesis.name, copyNemesis)
    //     return nemesis!!
    // }

    const onView = () => {
        navigate(Path.Armor + name + '/view');
    }

    return (
        <Card>
            <CardHeader title={getName(armor)} style={{ textAlign: 'center' }} action={<IconButton title='View' size='small' onClick={(): void => onView()}>
                <CheckIcon color='primary' fontSize='small' />
            </IconButton>}/>
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>

                </Grid>
            </CardContent>
        </Card>
    )
}
