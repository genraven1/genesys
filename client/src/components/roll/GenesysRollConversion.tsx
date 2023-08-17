import Roll, {Results} from "../../models/Roll";
import GenesysDescriptionTypography from "../common/typography/GenesysDescriptionTypography";

interface RollProps {
    roll: Roll
}

export function GenesysRollConversion(props: RollProps): JSX.Element {
    const {roll} = props

    const generateResultText = ():string => {
        let text = ''
        while (roll.proficiency > 0) {
            text.concat('[proficiency]')
            roll.proficiency--
        }
        while (roll.ability > 0) {
            text.concat('[ability]')
            roll.ability--
        }
        while (roll.boost > 0) {
            text.concat('[boost]')
            roll.boost--
        }
        while (roll.challenge > 0) {
            text.concat('[challenge]')
            roll.challenge--
        }
        while (roll.difficulty > 0) {
            text.concat('[difficulty]')
            roll.difficulty--
        }
        while (roll.setback > 0) {
            text.concat('[setback]')
            roll.setback--
        }
        while (roll.success > 0) {
            text.concat('[success]')
            roll.success--
        }
        while (roll.failure > 0) {
            text.concat('[failure]')
            roll.failure--
        }
        while (roll.advantage > 0) {
            text.concat('[advantage]')
            roll.advantage--
        }
        while (roll.threat > 0) {
            text.concat('[threat]')
            roll.threat--
        }
        while (roll.triumph > 0) {
            text.concat('[triumph]')
            roll.triumph--
        }
        while (roll.despair > 0) {
            text.concat('[despair]')
            roll.despair--
        }
        return text;
    }

    return (
        <GenesysDescriptionTypography text={generateResultText()}/>
    )
}

interface ResultsProps {
    results: Results
}

export function GenesysResultsConversion(props: ResultsProps): JSX.Element {
    const {results} = props

    const generateResultText = ():string => {
        let text = ''
        while (results.success > 0) {
            text.concat('[success]')
            results.success--
        }
        while (results.failure > 0) {
            text.concat('[failure]')
            results.failure--
        }
        while (results.advantage > 0) {
            text.concat('[advantage]')
            results.advantage--
        }
        while (results.threat > 0) {
            text.concat('[threat]')
            results.threat--
        }
        while (results.triumph > 0) {
            text.concat('[triumph]')
            results.triumph--
        }
        while (results.despair > 0) {
            text.concat('[despair]')
            results.despair--
        }
        return text;
    }

    return (
        <GenesysDescriptionTypography text={generateResultText()}/>
    )
}