import Roll, {Results} from "../../models/Roll";
import GenesysDescriptionTypography from "../common/typography/GenesysDescriptionTypography";
import {Fragment, useState} from "react";

interface RollProps {
    roll: Roll
}

export function GenesysRollConversion(props: RollProps): JSX.Element {
    const {roll} = props
    const [text, setText] = useState('')

    const generateRollText = (): string => {
        if (!roll) {
            return text
        }
        while (roll.proficiency > 0) {
            setText(text.concat('[proficiency] '))
            roll.proficiency--
        }
        while (roll.ability > 0) {
            setText(text.concat('[ability] '))
            roll.ability--
        }
        while (roll.boost > 0) {
            setText(text.concat('[boost] '))
            roll.boost--
        }
        while (roll.challenge > 0) {
            setText(text.concat('[challenge] '))
            roll.challenge--
        }
        while (roll.difficulty > 0) {
            setText(text.concat('[difficulty] '))
            roll.difficulty--
        }
        while (roll.setback > 0) {
            setText(text.concat('[setback] '))
            roll.setback--
        }
        while (roll.success > 0) {
            setText(text.concat('[success] '))
            roll.success--
        }
        while (roll.failure > 0) {
            setText(text.concat('[failure] '))
            roll.failure--
        }
        while (roll.advantage > 0) {
            setText(text.concat('[advantage] '))
            roll.advantage--
        }
        while (roll.threat > 0) {
            setText(text.concat('[threat] '))
            roll.threat--
        }
        while (roll.triumph > 0) {
            setText(text.concat('[triumph] '))
            roll.triumph--
        }
        while (roll.despair > 0) {
            setText(text.concat('[despair] '))
            roll.despair--
        }
        return text;
    }

    return (
        <GenesysDescriptionTypography text={generateRollText()}/>
    )
}

interface ResultsProps {
    results: Results
}

export function GenesysResultsConversion(props: ResultsProps): JSX.Element {
    const {results} = props

    const generateResultText = (): string => {
        let text = ''
        if (!results) {
            return 'None';
        }
        while (results.success > 0) {
            text = text.concat('[success] ')
            results.success--
        }
        while (results.failure > 0) {
            text = text.concat('[failure] ')
            results.failure--
        }
        while (results.advantage > 0) {
            text = text.concat('[advantage] ')
            results.advantage--
        }
        while (results.threat > 0) {
            text = text.concat('[threat] ')
            results.threat--
        }
        while (results.triumph > 0) {
            text = text.concat('[triumph] ')
            results.triumph--
        }
        while (results.despair > 0) {
            text = text.concat('[despair] ')
            results.despair--
        }
        return text;
    }

    return (
        <Fragment>
            <GenesysDescriptionTypography text={generateResultText()}/>
        </Fragment>
    )
}