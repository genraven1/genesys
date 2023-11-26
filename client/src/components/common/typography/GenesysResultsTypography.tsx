import {Results} from "../../../models/Roll";
import {Fragment} from "react";
import Typography from "@mui/material/Typography";

interface Props {
    results: Results
}

export default function GenesysResultsTypography(props: Props): JSX.Element {
    const {results} = props

    const displayResults = (): string => {
        let text = ' '
        if (!results) {
            return 'None';
        }
        console.log(results)
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
        const string = text.split(' ');
        console.log(string)
        const array = string.map((word: string) => {
            const target = word.toLowerCase();
            console.log(target)
            switch (true) {
                case target.includes('[advantage]'):
                    return '<i class="symbol advantage"></i>';
                case target.includes('[success]'):
                    return '<i class="symbol success"></i>';
                case target.includes('[triumph]'):
                    return '<i class="symbol triumph"></i>';
                case target.includes('[threat]'):
                    return '<i class="symbol threat"></i>';
                case target.includes('[failure]'):
                    return '<i class="symbol failure"></i>';
                case target.includes('[despair]'):
                    return '<i class="symbol despair"></i>';
                default:
                    return `${word}`;
            }
        });
        console.log(array)
        const filterArray = array.filter(str => str)
        console.log(filterArray)
        let final = '';
        filterArray.forEach((word, index) => {
            if (
                (word.includes('symbol') &&
                    array[index + 1] &&
                    array[index + 1].includes('symbol')) ||
                array.length === index + 1
            ) {
                final += word;
            } else {
                final += `${word} `;
            }
        });
        if (final === '') {
            return 'EMPTY'
        }
        console.log(final)
        return final;
    }

    return (
        <Fragment>
            <Typography style={{wordWrap: 'break-word', textAlign: 'center'}}
                        dangerouslySetInnerHTML={{__html: displayResults()}}/>
        </Fragment>
    )
}