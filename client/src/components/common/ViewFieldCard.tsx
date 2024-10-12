import InputNumberRangeSelectField from "./InputNumberRangeSelect";
import {
    Autocomplete,
    Card,
    CardActions, FormControl,
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
import GenesysTextField from "./GenesysTextField";
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
                <GenesysDescriptionTypography text={value}/>
            </Card>
        </Grid>
    )
}

interface TextFieldProps {
    title: string;
    value: string;
    disabled: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function TextFieldCard(props: TextFieldProps) {
    const {title, value, disabled, onChange} = props
    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={title}/>
                <GenesysTextField text={value} label={title} disabled={disabled} onChange={onChange}/>
            </Card>
        </Grid>
    )
}

interface NumberTextFieldProps {
    title: string
    value: number
    onChange: (value: number) => void
    min: number
    max: number
    disabled: boolean
    steps?: number
}

export function NumberTextFieldCard(props: NumberTextFieldProps) {
    const {title, value, onChange, min, max, disabled, steps} = props;

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={title}/>
                <TextField
                    type="number"
                    value={value}
                    label={title}
                    fullWidth
                    onChange={(e) => onChange(Number(e.target.value))}
                    inputProps={{min: min, max: max, step: steps}}
                    disabled={disabled}
                />
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
                <TextField
                    type="number"
                    value={value}
                    label={type}
                    fullWidth
                    onChange={(e) => handleCharacteristicChange(type, Number(e.target.value))}
                    inputProps={{min: 1, max: 5}}
                    disabled={disabled}
                />
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
            </Card>
        </Grid>
    )
}

interface EditNumberProps {
    value: number,
    title: string,
    onChange: (value: number) => void
    min: number
    max: number
}

export function EditNumberFieldCard(props: EditNumberProps) {
    const { value, title, onChange, min, max } = props;

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={title}/>
                <CardActions>
                    <InputNumberRangeSelectField defaultValue={value} min={min} max={max} onCommit={onChange} />
                </CardActions>
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