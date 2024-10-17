import InputNumberRangeSelectField from "./InputNumberRangeSelect";
import {
    Autocomplete,
    Card,
    CardActions, CardContent, FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import GenesysDescriptionTypography from "./typography/GenesysDescriptionTypography";
import * as React from "react";
import Quality from "../../models/Quality";
import GenesysQualityTypography from "./typography/GenesysQualityTypography";
import {renderSkillName} from "./skill/SkillRenders";
import Skill from "../../models/actor/Skill";
import {CharacteristicType} from "../../models/character/Characteristic";
import CenteredCardHeader from "./card/CenteredCardHeader";

interface ViewProps {
    name: string
    value: string
}

export function ViewFieldCard(props: ViewProps) {
    const {name, value} = props
    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={name}/>
                <CardContent>
                    <GenesysDescriptionTypography text={value}/>
                </CardContent>

            </Card>
        </Grid>
    )
}

interface BooleanTextFieldProps {
    title: string;
    value: boolean;
    disabled: boolean;
    onChange: (value: boolean) => void
}

export function BooleanTextFieldCard(props: BooleanTextFieldProps) {
    const {title, value, disabled, onChange} = props
    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={title}/>
                <CardContent>
                    <FormControl fullWidth>
                        <InputLabel>{title}</InputLabel>
                        <Select
                            value={value ? 'Yes' : 'No'}
                            onChange={(e) => onChange(e.target.value === 'Yes')}
                            label="Ranked"
                            disabled={disabled}
                        >
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                        </Select>
                    </FormControl>
                </CardContent>
            </Card>
        </Grid>
    )
}

interface CharacteristicProps {
    type: CharacteristicType
    value: number
    handleCharacteristicChange: (type: CharacteristicType, value: number) => void
    disabled: boolean
}

export function CharacteristicCard(props: CharacteristicProps) {
    const {type, value, handleCharacteristicChange, disabled} = props;

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={'Characteristic Type'}/>
                <CardContent>
                    <TextField
                        type="number"
                        value={value}
                        label={type}
                        fullWidth
                        onChange={(e) => handleCharacteristicChange(type, Number(e.target.value))}
                        inputProps={{min: 1, max: 5}}
                        disabled={disabled}
                    />
                </CardContent>
            </Card>
        </Grid>
    )
}

interface SkillAutoCompleteProps {
    disabled: boolean
    handleSkillChange: (newValue: Skill) => void
    skills: Skill[]
    startingSkill: Skill
}

export function SkillAutocompleteCard(props: SkillAutoCompleteProps) {
    const {handleSkillChange, disabled, startingSkill, skills} = props;

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={'Skill'}/>
                <CardContent>
                    <Autocomplete
                        options={skills}
                        getOptionLabel={(option) => renderSkillName(option)}
                        value={startingSkill}
                        fullWidth
                        onChange={(e, newValue) => handleSkillChange(newValue as Skill)}
                        renderInput={(params) => <TextField {...params} label='Skill'
                                                            variant="outlined"/>}
                        disabled={disabled}
                    />
                </CardContent>
            </Card>
        </Grid>
    )
}

interface QualityActivationProps {
    quality: Quality
}

export function ViewQualityActivationCard(props: QualityActivationProps) {
    const {quality} = props

    const renderActivation = () => {
        return quality?.cost!! === 0 ? <GenesysDescriptionTypography text={'Passive'}/> :
            <GenesysQualityTypography ranks={quality?.cost}/>;
    }

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={quality.name}/>
                {renderActivation()}
            </Card>
        </Grid>
    )
}